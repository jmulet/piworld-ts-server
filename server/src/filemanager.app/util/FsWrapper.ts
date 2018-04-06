/**
 * Wrapper around fs
 * to support promises and never throw exception, instead return error message: see FilemanagerResponse structure
 */

import * as fs from 'fs';
import * as path from 'path';
import { FilemanagerResponse, TreeNode, TreeNodeData, IdentityACL } from '../services/FilemanagerInterfaces';

/**
 * Wrapper around stat;
 * It extends the method by providing ACLs
 * @param dir 
 */
export function stat(dir: string, identity: IdentityACL): Promise<FilemanagerResponse> {
    return new Promise( (resolve) => {
        const filename = path.basename(dir);
        fs.stat(dir, function(err, stats) {
            if (err) {
                resolve({err: err.message});
                return;
            }
            const node: TreeNode = {
                label: filename,
                data: {
                    name: filename,
                    fullpath: dir,
                    type: stats.isDirectory()? "directory": "file",
                    size: stats.size
                }
            }; 

            // Read ACLs and set permissions on this file
            

            resolve({node: node});  
        });
    });
}

export function readFile(dir: string, opts?: any): Promise<FilemanagerResponse> {
    return new Promise( (resolve) => {
        const filename = path.basename(dir);
        fs.readFile(dir, opts, function(err, txt) {
            if (err) {
                resolve({err: err.message});
                return;
            }
            resolve({node: {
                label: filename,
                data: {
                    name: filename,
                    fullpath: dir,
                    type: stats.isDirectory()? "directory": "file",
                    size: stats.size,
                    content: txt
                }
            }});
        });

    });
}

export function saveFile(dir: string, content: any, opts: any) {
    return new Promise( (resolve) => {
        const filename = path.basename(dir);
        fs.writeFile(dir, content, opts, function(err) {
            if (err) {
                resolve({err: err.message});
                return;
            }
            fs.stat(dir, function(err, stats) {
                const node: TreeNode = {
                    label: filename,
                    data: {
                        name: filename,
                        fullpath: dir,
                        type: "file"
                    }
                };
                if (!err) {
                    node.data.size = stats.size;
                    node.data.type = stats.isDirectory()? "directory": "file";
                }
                resolve({err: err.message, node: node});                            
            })            
        });
    });
}

export function mkdirs() {

}

export function mkdir() {

}