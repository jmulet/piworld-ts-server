import 'es6-shim';
import 'reflect-metadata';

import { Container } from 'typedi';

import { BaseApp } from '../BaseApp';  
/*
 * Pda.app
 * Josep Mulet (pep.mulet@gmail.com)
 * https://github.com/jmulet/piworld-server
 */
export class PdaApp extends BaseApp {

    static entities = [
        __dirname + "/entities/*.ts",
        __dirname + "/entities/*.js"
    ]; 
     
    constructor() {
        super();
        this.config.path = "pda.htm";
        this.config.icon = "fa fa-mobile";
        this.config.hashes = [];
        this.create("PDA", __dirname);
       
    }
    
}

