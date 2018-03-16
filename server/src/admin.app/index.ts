import 'es6-shim';
import 'reflect-metadata';

import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

import { BaseApp } from '../BaseApp';
import { ActivityModel } from '../main.app/entities/classroom';
import { PwHttpServer } from '../server';
import { config } from '../server.config';

chai.use(chaiHttp);

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

    async tests() {
        const asUsername = config.admin.username;
        const asPassword = config.admin.password
        const agent = PwHttpServer.getInstance().agent;
        const expect = chai.expect;

        // Do login
        console.log("Login:");
        let res = await agent.post('/login.htm')
            .send({
                username: asUsername,
                password: asPassword,
                parents: 0
            });
            

    }

}



 