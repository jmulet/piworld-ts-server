import 'es6-shim';
import 'reflect-metadata';

import { useContainer as routingUseContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';
import { config } from './server/server.config';
import { PwHttpServer } from './server/server';

/** Import all apps here */
import { MainApp } from './server/main.app/';
import { AdminApp } from './server/admin.app/';
import { ClassroomApp } from './server/classroom.app/';
  
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
    /* Remember to add entities from loaded apps here */
    entities: [...MainApp.entities,
               ...AdminApp.entities,
               ...ClassroomApp.entities],
    synchronize: true,
    logging: process.env.NODE_ENV !== 'production'

}).then(connection => {

    // Get an instance of the main httpServer
    const pwServer = PwHttpServer.getInstance();

    // Install application's routes
    pwServer.install(MainApp);
    pwServer.install(AdminApp);
    pwServer.install(ClassroomApp);

    pwServer.listen({handleErrors: (process.env.NODE_ENV === 'production'), mountStaticPrivate: true});

}).catch(error => {
    console.log("TypeORM connection error: ", error);
    process.exit(1);
});

