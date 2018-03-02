import 'es6-shim';
import 'reflect-metadata';

import { Container } from 'typedi';

import { BaseApp } from '../BaseApp'; 
import { typeClientGenerator } from '../main.app/utils/type-client-generator';

/*
 * Books.app
 * Josep Mulet (pep.mulet@gmail.com)
 * https://github.com/jmulet/piworld-server
 */
export class BooksApp extends BaseApp {

    static entities = [
        __dirname + "/entities/*.ts",
        __dirname + "/entities/*.js"
    ]; 
     
    constructor() {
        super();
        this.config.path = "books.htm";
        this.create("Books", __dirname);
      
        //Generate client entities and services from annotated classes.
        typeClientGenerator();
    }
    
}
