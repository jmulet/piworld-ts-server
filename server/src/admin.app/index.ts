import 'es6-shim';
import 'reflect-metadata';
 
import { BaseApp } from '../BaseApp'; 
import { PwHttpServer } from '../server';
import { config } from '../server.config';
 
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
        this.config.icon = "fa fa-cogs";
        this.config.isAdmin = true;
        this.config.hashes = [{hash: "#centers", name: "Schools", icon: "fa fa-building"}, 
                              {hash: "#courses", name: "Courses", icon: "fa fa-cubes"}];
        this.create("Admin", __dirname);
    }
}



 