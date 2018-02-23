import 'es6-shim';
import 'reflect-metadata';

import * as express from 'express';
import { useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import * as cons from "consolidate";
import { config } from '../server.config';
import { BaseApp } from '../BaseApp';

import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import { PwHttpServer } from '../server';
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

    tests() {
        return new Promise((resolve, reject) => {

            var agent = PwHttpServer.getInstance().agent;
            agent.post('http://127.0.0.1:' + config.port + '/demo/login.htm')
                .send({
                    username: config.admin.username,
                    password: config.admin.password,
                    parents: 0
                }).then( (res) => {
                    console.log(res);
                })


        });



    }
}




/*

                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                    'Accept': '/',
                    'Connection': 'keep-alive'
                }
            }, function (error, response, body) {
                console.log(response.headers);
                resolve(response.body);
                const c = request.cookie(response.headers['set-cookie'].join(';'));
                console.log( c  );
                request({
                    url: 'http://127.0.0.1:' + config.port + '/demo/api/center/list',
                    method: "GET",
                    json: true,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                        'Accept': '/',
                        'Cookie': c,
                        'Connection': 'keep-alive'
                    },
                    body: {
                    },
                    function(error, response, body) {
                        console.log('AAAAAA', response);
                        resolve(response.body);
                    }
                });
*/

