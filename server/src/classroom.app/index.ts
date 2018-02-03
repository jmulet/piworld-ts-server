import 'es6-shim';
import 'reflect-metadata';

import * as express from 'express';
import { useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import * as cons from "consolidate";
import { config } from '../server.config';
import { BaseApp } from '../BaseApp';
import { UserRoles } from '../main.app/entities/UserModel';

/*
 * Main.app
 * Josep Mulet (pep.mulet@gmail.com)
 * https://github.com/jmulet/piworld-server
 */
export class ClassroomApp extends BaseApp {
    // Tell which entities defines this app; if any
    static entities = [
        __dirname + "/entities/*.ts",
        __dirname + "/entities/*.js"
    ]; 
    
    adminTasks: any

    constructor() {
        super();
        this.config.path += "/classroom";

        // Tell admin.app which administrative tasks must load
        this.adminTasks = {
            name: "Classroom",
            tasks: [
                { 
                  name: "Groups",
                  roles: [UserRoles.admin, ...UserRoles.TEACHERS],
                  path: "/classroom/admin/groups"
                }
            ]
        };

        // bootstrap app
        this.create("Classroom", __dirname);     
    }

}

