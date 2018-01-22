import 'es6-shim';
import 'reflect-metadata';

import * as express from 'express';
import { useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import * as cons from "consolidate";
import { config } from '../server.config';
import { BootstrapSrv } from './services/BootstrapSrv';
import { BaseApp } from '../BaseApp';

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

    }


    /**
    
    //Generate client entities and services from annotated classes.
    typeClientGenerator();
    **/

}

