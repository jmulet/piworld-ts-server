import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { FileNodeModel } from "../../main.app/entities/filemanager/FileNodeModel";
import { FilesClosureModel } from "../../main.app/entities/filemanager/FilesClosureModel";

@Service()
export class FilemanagerDBSrv {
    closureRepository: Repository<FilesClosureModel>;
    nodesRepository: Repository<FileNodeModel>;

    constructor() {
        this.nodesRepository = getRepository(FileNodeModel);
        this.closureRepository = getRepository(FilesClosureModel);
    }

    createTree() {

    }

    getRoots() {

    }

    getChildren(node: FileNodeModel) {

    }

    getAncestors(node: FileNodeModel) {

    }

    getParent(node: FileNodeModel) {

    }

    getForest() {

    }

    addToNode(parent: FileNodeModel, node: FileNodeModel){

    }

    removeNode(node: FileNodeModel) {

    }

    saveNode(node: FileNodeModel) {

    }

    moveNode(parent: FileNodeModel, node: FileNodeModel) {

    }

}