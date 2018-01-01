import "reflect-metadata"; // this shim is required
import "es6-shim"; // this shim is required
import { useContainer as routingUseContainer  } from "routing-controllers";
import { createConnection, getManager, useContainer as ormUseContainer, getConnection } from "typeorm";
import { Container, Inject, Service } from "typedi";

// set up container for dependency-injection
//routingUseContainer(Container);
//ormUseContainer(Container);
 

import { Logins } from "../entities/LoginsModel";
import { Groups } from "../entities/GroupsModel";

import { LoginsRepository } from "../repositories/LoginsRepository";
import { UserRepository } from "../repositories/UserRepository";
import { Enroll } from "../entities/EnrollModel";
import { EnrollSrv } from "../services/EnrollSrv";
import { UserSrv } from "../services/UserSrv";
import { Connection } from "typeorm/connection/Connection";

 
 
export class Test {

        @Inject()
        private userSrv: UserSrv

        constructor(){
            console.log("injected ", this.userSrv);
        }


        start() {
        createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "Admin765431091",
            database: "imaths",
            entities: [
                __dirname + "/../entity/*.ts",
                __dirname + "/../entity/**/*.ts",
                __dirname + "/../model/*.ts"
            ],
            synchronize: true,
        }).then(async connection => {

            console.log("****** Connection established...");
            // const list = await connection.getCustomRepository(LoginsRepository).find({idUser:124});
            // const list = await connection.getCustomRepository(UserRepository).findOne({id: 124});
            const list = await new UserSrv().findByUsername("jmulet");
            console.log("Returning the list result .......");
            console.log(list);

        }).catch(error => console.log("TypeORM connection error: ", error));

    }

}

new Test().start();