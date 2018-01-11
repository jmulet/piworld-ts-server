import 'es6-shim';
import 'reflect-metadata';

import { useContainer as routingUseContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';

import { ErrorMdw } from './server/middlewares/ErrorMdw';
import { NotFoundMdw } from './server/middlewares/NotFoundMdw';
import { appServer } from './server/server';
import { config } from './server/server.config';
import { BootstrapSrv } from './server/services/BootstrapSrv';
import { typeClientGenerator } from './server/utils/type-client-generator';

// set up container for dependency-injection
routingUseContainer(Container);
ormUseContainer(Container);
//cvUseContainer(Container);


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
        defaultErrorHandler: false,
        // we specify controllers we want to use
        controllers: [
            __dirname + "/server/controllers/*.ts",
            __dirname + "/server/controllers/*.js",
            __dirname + "/server/controllers/**/*.ts",
            __dirname + "/server/controllers/**/*.js",
        ],
        middlewares: [
            NotFoundMdw,
            ErrorMdw
        ],
        routePrefix: config.basePrefix,
        validation: false // Disable validation by default
    });

    // Finally show all routes
    console.log("Mounted routes: ");
    appServer.app._router.stack.forEach(function (e) {
        if (e.route) {
            console.log(Object.keys(e.route.methods) , "  " ,e.route.path);
        }
    });

    // Do extra integrity checks on database before starting up server
    const bootstrapSrv = Container.get(BootstrapSrv);

    //Generate client entities and services from annotated classes.
    typeClientGenerator();

    bootstrapSrv.doChecks().then((r) => {
        if (r.errors) {
            console.log(r.errors);
            process.exit(1);
        } else {
            appServer.app.listen(config.express.port);
            console.log("piWorld-springjs application server is up and running on port " + config.express.port);
        }
    });



}).catch(error => {
    console.log("TypeORM connection error: ", error);
    process.exit(1);
});

