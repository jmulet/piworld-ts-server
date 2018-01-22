import 'es6-shim';
import 'reflect-metadata';

import * as express from 'express';
import { useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import * as cons from "consolidate";
import { config } from '../server.config';
import { BaseApp } from '../BaseApp';

/*
 * admin.app
 * Josep Mulet (pep.mulet@gmail.com)
 * https://github.com/jmulet/piworld-ts-sever
 */
export class AdminApp extends BaseApp {
    static entities = [
        __dirname + "/entities/*.ts",
        __dirname + "/entities/*.js"
    ];

    installedApps = [];

    constructor() {
         super();
         this.config.path = "/admin";
         this.config.isAdmin = true;
         this.create("Admin", __dirname);
    }
}

