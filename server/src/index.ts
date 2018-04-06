import 'es6-shim';
import 'reflect-metadata';

import { useContainer as routingUseContainer, getMetadataArgsStorage } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';
import { useContainer as classValidatorUseContainer } from 'class-validator';
import { config } from './server.config';
import { PwHttpServer } from './server'; 

/** Import all apps here */
import { MainApp } from './main.app/';
import { AdminApp } from './admin.app/';
import { ClassroomApp } from './classroom.app';
import { PdaApp } from './pda.app/';
import { BooksApp } from './books.app';
import { ClassroomController } from './classroom.app/controllers/ClassroomController';
import { LoginController } from './main.app/controllers/LoginController';
import { clientRestGenerator } from './main.app/utils/client-rest-generator';
import { timeout } from 'async';
import { FilemanagerApp } from './filemanager.app';

const colors = require('colors/safe');
  
// set up container for dependency-injection
routingUseContainer(Container);
ormUseContainer(Container);
// classValidatorUseContainer(Container);
 
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
               ...PdaApp.entities,
               ...FilemanagerApp.entities
            ],
    synchronize: true,
    logging:  process.env.NODE_ENV !== 'production'

}).then( (connection) => {

    // Get an instance of the main httpServer
    const pwServer = PwHttpServer.getInstance();

    // Install application's routes
    pwServer.install(MainApp);
    pwServer.install(AdminApp);
    pwServer.install(ClassroomApp);
    pwServer.install(PdaApp);
    pwServer.install(BooksApp);
    pwServer.install(FilemanagerApp);

    pwServer.listen( {handleErrors: (process.env.NODE_ENV === 'production'), mountStaticPrivate: true} );

     // Generate client entities, services and documentation from annotated classes.
     if (process.env.NODE_ENV !== 'production') {
        setTimeout(clientRestGenerator, 4000); 
     }
     
}).catch(error => {
    console.log(colors.red("TypeORM connection error: "), error);
    process.exit(1);
});

