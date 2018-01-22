import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as http from 'http';
import * as methodOverride from 'method-override';
import * as path from 'path';
import * as SocketIO from 'socket.io';
import * as winston from 'winston';
import * as cons from 'consolidate';

import { ResponseLocalsMdw } from './main.app/middlewares/ResponseLocalsMdw';
import { config } from './server.config';
import { NotFoundMdw } from './main.app/middlewares/NotFoundMdw';
import { ErrorMdw } from './main.app/middlewares/ErrorMdw';
import { AuthenticatedMdw } from './main.app/middlewares/AuthenticatedMdw';

/*
 * piworld-server for piworld web apps
 * Josep Mulet (pep.mulet@gmail.com)
 * https://github.com/jmulet/piworld-server
 */
const MemoryStore = require('memorystore')(session);

export interface ListenOptions {
    handleErrors?: boolean;
    mountStaticPrivate?: boolean;
    port?: string;
}

export class PwHttpServer {
    adminInstance: any;
    installedApps = [];
    private static instance: PwHttpServer;
    app: express.Application;
    router: express.Router;
    server: http.Server;
    socketio: SocketIO.Server;

    public static getInstance(): PwHttpServer {
        if (!PwHttpServer.instance) {
            console.log("Creating a new httpServer:  " + config.basePrefix);
            PwHttpServer.instance = new PwHttpServer();
        }
        return PwHttpServer.instance;
    }

    public install(clazz) {
        console.log("* Installing app ");
        const appInstance = new clazz();
        this.app.use(appInstance.config.mountPoint, appInstance.app);
        this.installedApps.push(appInstance);
        if (appInstance.config.isAdmin) {
            this.adminInstance = appInstance;
        }

        //appInstance may have administration views associated that must be mounted by admin.app
        if (this.adminInstance && appInstance.adminTasks && !appInstance.config.isAdmin) {
            this.adminInstance.installedApps.push(appInstance.adminTasks);
        }
    }

    public getAdminTasks() {
        return this.adminInstance? this.adminInstance.installedApps : [];
    }

    public getInstalledApps() {
        return this.installedApps? this.installedApps : [];
    }

    public listen(options?: ListenOptions) {
        options = options || {};
        // Add authenticated static middleware
        // This is served static but it requires being authenticated
        if (options.mountStaticPrivate) {
            const dir = path.resolve(__dirname, "../client/private");
            const mountPoint = path.join("/", config.basePrefix, "files");
            console.log("Mounting private::  ", mountPoint, " as ", dir);
            this.app.use(mountPoint, new AuthenticatedMdw().use);
            this.app.use(mountPoint, express.static(dir));
        }
        // Finally add error 400 and 500 routes
        //if (options.handleErrors) 
        {
            console.log("Installing 404 & 500 error middelwares");
            this.errorRoutes();
        }
        // Listen app
        const port = options.port || config.express.port;
        this.app.listen(port);
        console.log("piWorld-ts server is up and running on port " + port);
    }

    private constructor() {
        // configure logger
        console.log("Configuring httpServer ...");
        this.loggerConfiguration();

        this.app = express();
        this.server = new http.Server(this.app),
        this.socketio = SocketIO(this.server),

        // configure express middleware
        this.expressConfiguration();
    }

    // Finally setup 404 and 500 routes
    private errorRoutes() {
        this.app.use( NotFoundMdw );
        this.app.use( ErrorMdw );
    }

    private expressConfiguration() {
        this.app.use(helmet());
        this.app.set('trust proxy', 1);

        this.app.use(session({
            name: config.basePrefix+"pwsid",
            secret: 'sf!d-.EKg059_sdñl4095j',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: 86400000,
                httpOnly: false
            },
            store: new MemoryStore({
                checkPeriod: 86400000 // prune expired entries every 24h
            })
        }));

        this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.text({ limit: '100mb' }));
        this.app.use(methodOverride());
        this.app.use(compression());
        this.app.use(ResponseLocalsMdw);


        // This is served static and public --> it could be handled by ngnix
        if (config.serveStatic !== false) {
            config.staticPrefix = config.basePrefix;
            const dir = path.resolve(__dirname, "../client/public");
            const mountPoint = path.join("/", config.staticPrefix);
            console.log("Mounting public:: ", mountPoint, " as ", dir);
            this.app.use(mountPoint, express.static(dir));
        }

        this.app.engine('ejs', cons.ejs);
        this.app.set('view engine', 'ejs');
        console.log('Mounting views:: ', __dirname + '/views');
        this.app.set('views', __dirname + '/views');

    }

    private loggerConfiguration() {
        console.log("Configuring logger ...");
        winston.add(winston.transports.File, {
            name: 'pw-info-log',
            filename: './log/piworld-server.log',
            json: false,
            level: config.logLevel || 'debug',
            exitOnError: false
        }  //Replace 'debug' by 'verbose'
        );
    }
}
 
// Expose public and private physical directories
global.__publicDir = path.resolve(__dirname, '../client/public'),
global.__serverDir = path.resolve(__dirname, '../client/private')

