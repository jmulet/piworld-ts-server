import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as path from 'path';

import { RestApi } from '../../rest/RestApi';
import { pwCore } from '../shared/pw-core';
import { TreeNode } from 'primeng/components/common/treenode';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message, ConfirmationService } from 'primeng/api';

interface FilemanagerResponse {
    err: string,
    node: TreeNode
}

function fullNodePath(node: TreeNode): string {
    let currentNode = node;
    let fullPath = currentNode.data.name;
    while (currentNode.parent) {
        fullPath = path.join(currentNode.parent.data.name, fullPath);
        currentNode = currentNode.parent;
    }
    return fullPath;
}

@Component({
    selector: 'app-component',
    templateUrl: './filemanager.component.html',
    styleUrls: [],
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class FilemanagerComponent implements OnInit {
    inputDlgVisible: boolean;
    inputDlgText: "";
    showDeleteBtn: boolean;
    lastUploadNode: any;
    currentNode: any; 
    uploadDir: any;
    uploadUrl = pwCore.Config.basePrefix + "/api/filemgr/upload";
    showUploadBtn: boolean;
    currentDir: any;
    treeFiles: TreeNode[];
    dir: string;
    selectedFiles: TreeNode[];

    constructor(private rest: RestApi, private growl: MessageService,
        private confirmSrv: ConfirmationService) {
        this.dir = path.join("/Users", pwCore.User.username);
    }
    ngOnInit() {
        this.selectedFiles = [];
        this.currentNode = null;
        this.reload();
    }
    reload() {
        this.rest.ApiFilemanager.listPath(this.dir, true, false).subscribe((data) => {
            const tree = <TreeNode[]> data;
            tree[0].expanded = true;
            this.treeFiles = tree;
        });
    }
    onNodeSelect(evt)  {
        console.log(evt);
        // Only a directory is selected, show upload button
        const selectedDirs = this.selectedFiles.filter((e) => e.data.type === "directory");
        this.showUploadBtn = selectedDirs.length === 1;
        if (this.showUploadBtn) {            
            let currentNode = selectedDirs[0];
            this.currentNode = currentNode;           
            this.uploadDir = fullNodePath(currentNode);
            this.uploadUrl = pwCore.Config.basePrefix + "/api/filemgr/upload?path=" + this.uploadDir;
        }
        this.showDeleteBtn = this.selectedFiles.length > 0;
    }
    onNodeUnselect(evt)  {
        console.log(evt);
        // Only a directory is selected, show upload button
        this.showUploadBtn = this.selectedFiles.filter((e) => e.data.type === "directory").length === 1;
        this.showDeleteBtn = this.selectedFiles.length > 0;
    }
    onBeforeUpload(evt) {
        if (!this.currentNode) {
            return;
        }
        console.log(evt);
        this.lastUploadNode = this.currentNode;
    }
    onUpload(evt) {
        console.log(evt);
        (<any[]>evt.files).forEach(e => {
            const node: TreeNode = {
                label: e.name,
                data: {
                    name: e.name,
                    size: e.size,
                    type: "file"
                }
            }
            this.lastUploadNode.children.push(node);
        });
    }

    removeSelected() {
        // Caution some paths are deleted protected
        const erasable = this.selectedFiles.filter((node) => node.data.erasable);
        if (!erasable.length) {
            this.growl.add(<Message> {severity: "warning", detail: "Nothing can be deleted."});
            return;
        }
        const fullPaths = erasable.map( (node) => fullNodePath(node) );  
        
        this.confirmSrv.confirm({
            message: `Are you sure you want to delete ${erasable.map(e => e.data.name).join(',')}?`,
            accept: () => {
                this.rest.ApiFilemanager.deletePaths(fullPaths).subscribe(data => {
                    this.reload();
                });
            }
        });
        
    }
    onUploadError(ev) {
        console.log(ev);
        this.growl.add(<Message> {severity: "error", detail: "Upload failed"});
    }
    createFile() {
        if (!this.currentNode) {
            return;
        }
        this.inputDlgText = "";
        this.inputDlgVisible = true;
    }
    onCloseInputDlg(ev) {
        if(ev.accept) {
            const name = this.inputDlgText.replace(" ", "");
            const fullPath = fullNodePath(this.currentNode);
            if(path.extname) {
                // create empty file 
                this.rest.ApiFilemanager.saveAsciiFile(fullPath, name, "").subscribe( (data: FilemanagerResponse) => {
                    if (data.err) {
                        this.growl.add(<Message> {severity: "error", detail: data.err});
                        return;
                    } 
                    if(data.node) {
                        this.currentNode.children.push(data.node);
                    }
                });
            } else {
                // create a new directory
                this.rest.ApiFilemanager.createDir(fullPath, name).subscribe( (data: FilemanagerResponse) => {
                    if (data.err) {
                        this.growl.add(<Message> {severity: "error", detail: data.err});
                        return;
                    } 
                    if(data.node) {
                        this.currentNode.children.push(data.node);
                    }
                });
            }
        }
    }
}