import * as fs from 'fs-extra';
import * as path from 'path';
import * as JSZip from 'jszip';
import { Service } from "typedi";
import { ListFilesOptions, TreeNode, ACLTable } from "../services/FilemanagerInterfaces";
import { config } from '../../server.config';
import { exec } from 'child_process';
import { walk } from 'walk'; 
import { hasACLpermission } from '../services/FilemanagerSrv';


const rootFilesystem = path.resolve(config.rootFilesystem);

function readACLPromise(aclPath) {
    return new Promise( async (resolve) => {
        try {
            const txt = await fs.readFile(path.join(aclPath, ".eACL"), {encoding: 'utf8'})
            resolve(JSON.parse(txt));
        } catch(Ex) {
            resolve({});
        }
    })
}

@Service()
export class Filesystem {
    move(fromdirectory: string, todirectory: string): any {
        return fs.rename(fromdirectory, todirectory);
    }
    async unzip(directory: string) {
        /*
        const isDirectory = await this.isDirectory(directory);
        if (isDirectory) {
            return false;
        } else {
            var zip = new JSZip();

            const content = await zip.generateAsync({type:"blob"});

        }
        return 
        */
    }
    async zip(directory: string) {
        /*
     const isDirectory = await this.isDirectory(directory);
        if (isDirectory) {
            return false;
        } else {
            var zip = new JSZip();
            zip.file(filname, )
            const content = await zip.generateAsync({type:"blob"});
            return fs.writeFile(directory + ".zip", content);
        }
        */
    }
    upload(file: Express.Multer.File) {
        const directory = path.join(rootFilesystem, file.destination, file.filename);
        const buffer = fs.createWriteStream(file.buffer);
        return fs.writeFile(directory, buffer);
    }
    saveAsciiFile(file: string, text: string) {
        return fs.writeFile(file, text, { encoding: 'utf8' });
    }
    createDir(directory: string) {
        return fs.mkdirs(directory);
    }
    async delete(directory: string) {
        try {
            const isDirectory = await this.isDirectory(directory);
            if (isDirectory) {
                return new Promise((resolve, reject) =>
                    exec("rm -fr \"" + directory + "\"", function (err, data) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(data);
                    })
                );
            } else {
                return fs.unlink(directory);
            }
        } catch (ex) {
            return false;
        }
    }
    async getMetadata(directory: string) {
        try {
            const stats = await fs.stat(directory);
            return stats;
        } catch (Ex) {
            return {};
        }
    }
    async getACL(directory: string) {
        const dir = path.join(path.basename(directory), ".eACL");
        try {
            return fs.readFile(dir);
        } catch (Ex) {
            return "{}";
        }
    }
    async setACL(directory: string, acl: string) {
        const dir = path.join(path.basename(directory), ".eACL");
        try {
            return fs.writeFile(dir, acl);
        } catch (Ex) {
            return false;
        }
    }
    readFile(directory: string) {        
        return new Promise( (resolve) => {        
            fs.readFile(directory, function(err, data) {
                if(err) {
                    return resolve(null);
                }
                resolve(data);
            });
        });
    }
    readStream(directory: string) {
        return fs.createReadStream(directory);
    }
    async list(directory: string, role: string, username: string, opts?: ListFilesOptions) {
        const baseOpts: ListFilesOptions = {
            hidedirs: false,
            hidefiles: false,
            dotfiles: false,
            recursive: false,
            includeAcls: false
        };
        const options = {...baseOpts, ...opts};

        if (options.recursive) {
            return this.listTree(directory, role, username, options);
        } else {
            const files = await fs.readdir(directory);
             
            let promises = [];
            files.forEach( (filePath) => {
                promises.push( fs.stat(path.join(directory, filePath)) );
            })
            let stats = await Promise.all(promises);
            
            // filter
            stats = stats.filter( (e, i) => {
                const name = files[i];
                e.name = name;
                e.type = e.isDirectory()? "directory": "file";
                if (name === ".eACL") {
                    return false;
                } else if (!options.dotfiles && name.startsWith(".")) {
                    return false;
                }
                return true;
            });

            // load acl for all directories
            if (config.includeAcls) {
                promises = [];
                stats.forEach((e) => {
                    if (e.type === "directory") {
                        promises.push(readACLPromise(path.join(directory, e.name)));
                    }
                });

                let acls = await Promise.all(promises);
                let i = 0;
                stats.forEach((e) => {
                    if (e.type === "directory") {
                        e.acl = acls[i];
                        i += 1;
                    }
                });
            }

            return stats.map( (e) => { return {
                    data: {
                        name: e.name,
                        type: e.type,
                        size: e.size,
                        acl: e.acl             
                    },
                    label: e.label,                    
            }});

        }
    }
    private listTree(directory: string, role: string, username: string, options: ListFilesOptions) {
        const baseRoot = directory.replace(rootFilesystem, "");
        const fileTree = <TreeNode[]> [ 
            {
                label: baseRoot,
                data: {
                    name: baseRoot,
                    type: "directory"
                },                
                children: <TreeNode[]> []
            }
        ];
        
        const dirsNotAllowed: string[] = [];
        const dirsAllowed: string[] = [directory]; 
        const walker = walk(directory);
        return new Promise((resolve, reject) => {

            walker.on("directory", async function (root, fileStats, next) {
                if (dirsNotAllowed.filter(e => e.startsWith(root)).length) {                   
                    return next();
                }

                const dirname = root.replace(directory, "");
                let currentRoot = fileTree[0];
                const partials = dirname.split(path.sep);
                for (var i = 0; i < partials.length - 1; i++) {
                    if (!currentRoot) {
                        break;
                    }
                    currentRoot = currentRoot.children.filter( e => e.data.name === partials[i])[0];
                } 

                const fileDescriptor: TreeNode = {
                    data: {
                        name: fileStats.name,
                        type: fileStats.type
                    },
                    label: fileStats.name,                    
                    children: []
                };

                try {
                    const aclTxt = await fs.readFile(path.join(root, fileStats.name, ".eACL"), { encoding: "utf8" });
                    if (aclTxt) {
                        const acl: ACLTable = JSON.parse(aclTxt);
                        if(options.includeAcls) {
                            fileDescriptor.data.acl = acl;
                        }
                        const permission1 = hasACLpermission(acl, "view", role, username, true);
                        if (permission1) {
                            dirsAllowed.push(root);
                            if (currentRoot) {
                                currentRoot.children.push(fileDescriptor);
                            }
                        } else {
                            dirsNotAllowed.push(root);
                        }
                        next();
                    } else {
                        if (dirsAllowed.filter(e => e.startsWith(root)).length) {
                            if (currentRoot) {
                                currentRoot.children.push(fileDescriptor);
                            }
                        }
                        next();
                    }
                } catch (Ex) { 
                    if (dirsNotAllowed.filter(e => e.startsWith(root)).length === 0) {
                        if (currentRoot) {
                            currentRoot.children.push(fileDescriptor);
                            dirsAllowed.push(root);
                        }
                    }
                    next();
                }
            });
            walker.on("file", async function (root, fileStats, next) {
                if (options.hidefiles || fileStats.name === ".eACL") {
                    next();
                    return;
                }
                if (!options.dotfiles && fileStats.name.startsWith(".")) {
                    next();
                    return;
                } 
                const dirname = root.replace(directory, "");
                let currentRoot = fileTree[0];
                const partials = dirname.split(path.sep); 
                for (var i = 1; i < partials.length; i++) {
                    if (!currentRoot) {
                        break;
                    }
                    currentRoot = currentRoot.children.filter( e => e.data.name === partials[i] && e.children)[0];
                } 
                if (currentRoot) {
                    const fileDescriptor: TreeNode = {
                        data: {
                            name: fileStats.name,
                            size: fileStats.size,
                            type: fileStats.type
                        },
                        label: fileStats.name                        
                    };
                    currentRoot.children.push(fileDescriptor);
                }
                next();
            });
            walker.on("errors", function (root, nodeStatsArray, next) {             
                next();
            });
            walker.on("end", function () {
                resolve(fileTree);
            });
        });
    }
    async isDirectory(directory: string): Promise <boolean | null> {
        try {
            const stats = await fs.stat(directory);
            return stats.isDirectory();
        } catch (Ex) {
            return null;
        }
    }

}