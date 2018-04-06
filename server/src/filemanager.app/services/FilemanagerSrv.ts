import { Service, Inject } from "typedi";
import { Filesystem } from "../util/Filesystem";
import * as path from 'path';
import { config } from '../../server.config';
import * as fse from 'fs-extra';
import { Response } from "express";
import * as mime from "mime-types";
import { ACLTable, ListFilesOptions } from "./FilemanagerInterfaces";


const rootFilesystem = path.resolve(config.rootFilesystem);

/**
 * Converts relative paths to absolute paths
 * and checks that no directory goes below rootFilesystem
 * @param directory 
 * @param filename 
 */
function resolveDir(directory: string, filename?: string): (string | null) {
    let dir = path.resolve(path.join(rootFilesystem, directory, filename || ""));
    if (dir.indexOf(rootFilesystem) !== 0) {
        return null;
    } else {
        return dir;
    }
}

export function hasACLpermission(acl: ACLTable, property: string, role: string, username: string, defaults: boolean, idCourse?: number): boolean {
    role = (role || "").toLowerCase();
    // The owner has all permissions
    if (acl.meta.owner == username) {
        return true;
    }
    const byUser = acl.access.filter((e) => e.username === username);
    if (byUser.length) {
        return byUser[0][property] !== undefined ? byUser[0][property] : defaults;
    }
    const byRole = acl.access.filter((e) => (e.role || "").toLowerCase() === role && role !== "");
    if (byRole.length) {
        return byRole[0][property] !== undefined ? byRole[0][property] : defaults;
    }
    const byCourse = acl.access.filter((e) => e.course === idCourse && idCourse);
    if (byCourse.length) {
        return byCourse[0][property] !== undefined ? byCourse[0][property] : defaults;
    }
    return defaults;
}

async function readACL(dirOrFile: string): Promise<ACLTable> {
    let dirname = path.dirname(dirOrFile);
    let acl;
    while (dirname.indexOf(rootFilesystem) === 0 && !acl) {
        const file = path.join(dirname, ".eACL");
        try {
            acl = await fse.readFile(file);
            return JSON.parse(acl);
        } catch {
            dirname = path.resolve(path.join(dirname, "../"));
        }
    }
    return null;
}

async function canReadFrom(dirOrFile: string, role: string, username: string, idCourse?: number): Promise<boolean> {
    const acl = await readACL(dirOrFile);
    if (acl) {
        return hasACLpermission(acl, "read", role, username, true);
    } else {
        return true;
    }
}

async function canWriteTo(dirOrFile: string, role: string, username: string, idCourse?: number): Promise<boolean> {
    const acl = await readACL(dirOrFile);
    if (acl) {
        return hasACLpermission(acl, "write", role, username, false);
    } else {
        return false;
    }
}

async function hasOwnership(dirOrFile: string, username: string): Promise<boolean> {
    const acl = await readACL(dirOrFile);
    if (acl) {
        return acl.meta.owner === username;
    } else {
        return false;
    }
}

async function canView(dirOrFile: string, role: string, username: string): Promise<boolean> {
    const acl = await readACL(dirOrFile);
    if (acl) {
        return hasACLpermission(acl, "view", role, username, false);
    } else {
        return true;
    }
}

@Service()
export class FilemanagerSrv {

    @Inject()
    fs: Filesystem


    async createUserStructure(role: string, username: string) {
        const dir = resolveDir(path.join("./Users", username));
        await this.fs.createDir(dir);
        // create ACL table
        const file = path.join(dir, ".eACL");
        const acl = {
            "meta": { owner: username, created: new Date() },
            "access": [
                { username: username, write: true, read: true, view: true }
            ],
            "share": []
        };

        return fse.writeFile(file, JSON.stringify(acl));
    }

    async createCourseStructure(role: string, username: string, idCourse: number) {
        const dir = resolveDir(path.join("./Courses", idCourse + ""));
        await this.fs.createDir(dir);
        // create ACL table
        const file = path.join(dir, ".eACL");
        const acl = {
            "meta": { owner: username, created: new Date() },
            "access": [
                { course: idCourse, write: false, read: true, view: true }
            ],
            "share": []
        };

        return fse.writeFile(file, JSON.stringify(acl));
    }


    async movePath(fromPath: string, toPath: string, role: string, username: string) {
        const dir1 = resolveDir(fromPath);
        const dir2 = resolveDir(toPath);
        if (dir1 === null || dir2 === null) {
            throw `Error: Invalid directories. Cannot move from ${dir1} to ${dir2}.`;
        }
        const permission1 = await canReadFrom(dir1, role, username);
        const permission2 = await canWriteTo(dir2, role, username);
        if (!permission1 || !permission2) {
            throw `Error: Incorrect permissions. Cannot move from ${dir1} to ${dir2}.`;
        }
        return this.fs.move(dir1, dir2);
    }

    async unzipPath(directory: string, role: string, username: string) {
        await this.fs.unzip(directory);
    }
    async zipPath(directory: string, role: string, username: string) {
        await this.fs.zip(directory);
    }
    async uploadFile(file: Express.Multer.File, role: string, username: string) {
        await this.fs.upload(file);
    }
    async downloadFile(directory: string, response: Response, role: string, username: string, inline?: boolean) {
        const dir = resolveDir(directory);
        const filename = path.basename(directory);
        const contentType = mime.lookup(directory) || 'application/octet-stream; charset=UTF-8';
        const disposition = inline ? "inline" : "attachment";

        if (dir === null) {
            response.writeHead(200, {
                "Content-Type": "text/plain",
                "Content-Disposition": disposition + "; filename=" + filename
            });
            return response.send(`Error: Invalid directory. Cannot read from ${directory}.`);
        }

        const permission1 = await canReadFrom(dir, role, username);
        if (!permission1) {
            response.writeHead(200, {
                "Content-Type": "text/plain",
                "Content-Disposition": disposition + "; filename=" + filename
            });
            return response.send(`Error: Invalid permissions. Cannot read from ${directory}.`);
        }

        try {
            await fse.stat(dir);
            const stream = this.fs.readStream(dir);
            response.writeHead(200, {
                "Content-Type": contentType,
                "Content-Disposition": disposition + "; filename=" + filename
            });
            return stream.pipe(response);
        } catch (Ex) {
            response.writeHead(200, {
                "Content-Type": "text/plain",
                "Content-Disposition": disposition + "; filename=" + filename
            });
            return response.send(Ex);
        }
    }
    async saveAsciiFile(directory: string, filename: string, text: string, role: string, username: string) {
        if (!path.extname(filename)) {
            filename += ".txt";
        }
        const dir = resolveDir(directory, filename);
        if (dir === null) {
            throw `Error: Invalid directory. Cannot touch to ${dir}.`;
        }
        const permission1 = await canWriteTo(dir, role, username);
        if (!permission1) {
            throw `Error: Incorrect permissions. Cannot write to ${dir}.`;
        }
        return this.fs.saveAsciiFile(dir, text);
    }
    async createDir(directory: string, dirname: string, role: string, username: string) {
        const dir = resolveDir(path.join(directory, dirname));
        if (dir === null) {
            throw `Error: Invalid directory. Cannot mkdir on ${dir}.`;
        }
        const permission1 = await canWriteTo(dir, role, username);
        if (!permission1) {
            throw `Error: Incorrect permissions. Cannot write to ${dir}.`;
        }
        await this.fs.createDir(dir);
        // create ACL table
        const file = path.join(dir, ".eACL");
        const acl = {
            "meta": { owner: username, created: new Date() },
            "access": [
                { username: username, write: true, read: true, view: true }
            ],
            "share": []
        };

        return fse.writeFile(file, JSON.stringify(acl));
    }
    async deletePaths(directories: string[], role: string, username: string) {
        const promises = [];
        directories.forEach(d => {
            promises.push(this.deletePath(d, role, username));
        });
        return Promise.all(promises);
    }
    async deletePath(directory: string, role: string, username: string) {
        const dir = resolveDir(directory);
        if (dir === null) {
            throw `Error: Invalid directory. Cannot rm on ${dir}.`;
        }
        const permission1 = await hasOwnership(dir, username);
        if (!permission1) {
            throw `Error: Incorrect permissions. Cannot rm ${dir}.`;
        }
        await this.fs.delete(dir);
    }
    async getACL(directory: string, role: string, username: string) {
        const dir = resolveDir(directory);
        if (dir === null) {
            throw `Error: Invalid directory. Cannot get ACL from ${dir}.`;
        }
        const permission1 = await hasOwnership(dir, username);
        if (!permission1) {
            throw `Error: Incorrect permissions. Cannot get ACL from ${dir}.`;
        }
        await this.fs.getACL(dir);
    }
    async setACL(directory: string, acl: ACLTable, role: string, username: string) {
        const dir = resolveDir(directory);
        if (dir === null) {
            throw `Error: Invalid directory. Cannot set ACL on ${dir}.`;
        }
        const permission1 = await hasOwnership(dir, username);
        if (!permission1) {
            throw `Error: Incorrect permissions. Cannot set ACL on ${dir}.`;
        }
        await this.fs.setACL(dir, JSON.stringify(acl));
    }
    async readFile(directory: string, role: string, username: string) {
        const dir = resolveDir(directory);
        if (dir === null) {
            throw `Error: Invalid directory. Cannot read from ${dir}.`;
        }
        const permission1 = await canReadFrom(dir, role, username);
        if (!permission1) {
            throw `Error: Incorrect permissions. Cannot read from ${dir}.`;
        }
        return this.fs.readFile(dir);
    }
    async listPath(directory: string, role: string, username: string, opts?: ListFilesOptions) {
        const dir = resolveDir(directory);
        if (dir === null) {
            throw `Error: Invalid directory. Cannot list from ${dir}.`;
        }
        const permission1 = await canView(dir, role, username);
        if (!permission1) {
            throw `Error: Incorrect permissions. Cannot list ${dir}.`;
        }
        return this.fs.list(dir, role, username, opts);
    }
}