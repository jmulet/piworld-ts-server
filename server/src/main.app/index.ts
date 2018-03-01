import 'es6-shim';
import 'reflect-metadata';

import { Container } from 'typedi';

import { BaseApp } from '../BaseApp';
import { BootstrapSrv } from './services/BootstrapSrv';
import { typeClientGenerator } from './utils/type-client-generator';

/*
 * Main.app
 * Josep Mulet (pep.mulet@gmail.com)
 * https://github.com/jmulet/piworld-server
 */
export class MainApp extends BaseApp {

    static entities = [
        __dirname + "/entities/*.ts",
        __dirname + "/entities/*.js"
    ]; 
     
    constructor() {
        super();
        this.config.path = "desktop.htm";
        this.create("Desktop", __dirname);
    
        const bootstrapSrv = Container.get(BootstrapSrv);
        
        bootstrapSrv.doChecks().then((r) => {
            if (r.errors) {
                console.log(r.errors);
                process.exit(1);
            }
        });

        //Generate client entities and services from annotated classes.
        typeClientGenerator();
    }
    
}

