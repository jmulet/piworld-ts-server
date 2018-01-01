import 'es6-shim';
import 'reflect-metadata';

import { useContainer as routingUseContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';

import { DesktopController } from './server/controllers/DesktopController';
import { ErrorController } from './server/controllers/ErrorController';
import { HomeController } from './server/controllers/HomeController';
import { LoginController } from './server/controllers/LoginController';
import { appServer } from './server/server';
import { config } from './server/server.config';
import { BootstrapSrv } from './server/services/BootstrapSrv';

// set up container for dependency-injection
routingUseContainer(Container);
ormUseContainer(Container);


createConnection({
    type: "mysql",
    host: config.mysql.host,
    port: config.mysql.port,
    username: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database,
    entities: [
        __dirname + "/server/entities/*.js",
        __dirname + "/server/entities/**/*.js",
        __dirname + "/server/entities/*.ts",
        __dirname + "/server/entities/**/*.ts"
    ],
    synchronize: true,
    logging: true
}).then(async connection => {

    // reuses express app, registers all controller routes 
    useExpressServer(appServer.app, {
        controllers: [  // we specify controllers we want to use
            LoginController,
            ErrorController,
            HomeController,
            DesktopController,
        ]
    });

    // Do extra integrity checks on database before starting up server
    const bootstrapSrv = Container.get(BootstrapSrv);

    bootstrapSrv.doChecks().then((r) => {
        if (r.errors) {
            console.log(r.errors);
            process.exit(1);
        } else {
            appServer.app.listen(config.express.port);
            console.log("piWorld-springjs application server is up and running on port "+config.express.port);
        }        
    });



}).catch(error => {
    console.log("TypeORM connection error: ", error);
    process.exit(1);
});

