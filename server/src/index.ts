import 'es6-shim';
import 'reflect-metadata';

import { useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';
import { config } from './server.config';
import { PwHttpServer } from './server';

/** Import all apps here */
import { MainApp } from './main.app/';
import { AdminApp } from './admin.app/';
import { ClassroomApp } from './classroom.app/';
import { PdaApp } from './pda.app/';
import { BooksApp } from './books.app/';

const colors = require('colors/safe');
  
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
               ...ClassroomApp.entities,
               ...BooksApp.entities,
               ...PdaApp.entities
            ],
    synchronize: true,
    logging:  process.env.NODE_ENV !== 'production'

}).then(connection => {

    // Get an instance of the main httpServer
    const pwServer = PwHttpServer.getInstance();

    // Install application's routes
    pwServer.install(MainApp);
    pwServer.install(AdminApp);
    pwServer.install(ClassroomApp);
    pwServer.install(PdaApp);
    pwServer.install(BooksApp);

    pwServer.listen({handleErrors: (process.env.NODE_ENV === 'production'), mountStaticPrivate: true});

}).catch(error => {
    console.log(colors.red("TypeORM connection error: "), error);
    process.exit(1);
});

