import 'es6-shim';
import 'reflect-metadata';

import { Container } from 'typedi';

import { BaseApp } from '../BaseApp';  

/*
 * Filemanager.app
 * Josep Mulet (pep.mulet@gmail.com)
 * https://github.com/jmulet/piworld-server
 */
export class FilemanagerApp extends BaseApp {

    static entities = [
        __dirname + "/entities/*.ts",
        __dirname + "/entities/*.js"
    ]; 
     
    constructor() {
        super();
        this.config.path = "filemanager.htm";
        this.config.icon = "fa fa-file";
        this.create("File manager", __dirname);      
    }
    
}
