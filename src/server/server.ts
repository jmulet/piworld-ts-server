/*
 * piworld-server for piworld web apps
 * Josep Mulet (pep.mulet@gmail.com)
 * https://github.com/jmulet/piworld-server
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as http from 'http';
import * as methodOverride from 'method-override';
import * as winston from 'winston';
import * as SocketIO from 'socket.io';
import * as cons from  "consolidate";
import * as compression from  "compression";
import * as session from "express-session";
import { UserRoles } from "./entities/UserModel";
import * as helmet from 'helmet'; 


const MemoryStore = require('memorystore')(session);
const config = require('./server.config');

export class HttpServer {
    public app: express.Application;
    public router: express.Router;
    public server: http.Server;
    public socketio: SocketIO.Server;

    public static bootstrap(): HttpServer {
        console.log("Creating a new httpServer ...");
        return new HttpServer();
    }

    private constructor() {
        // configure logger
        console.log("Calling constructor ...");
        this.loggerConfiguration();
      
        this.app = express();
        this.server = new http.Server(this.app),
        this.socketio = SocketIO(this.server),

        // configure express middleware
        this.expressConfiguration();
 
        // This is served static but it requires being authenticated
        const dir = path.resolve(__dirname, "../client/private");
        console.log("Mounting as /files =", dir);
        this.app.use("/files", express.static(dir));
         
        // Finally setup error and 404 routes
        this.app.use( function (err: any, req: express.Request, res: express.Response, next: express.NextFunction ) {

            // respond with html page
            if (req.accepts('html')) {
                res.render("/errors/404.htm", {error: err.stack});
                return;
            }

            // respond with json
            if (req.accepts('json')) {
                res.send({ error: 'Page not found or error ' + err });
                return;
            }

        });

    }
  
    private expressConfiguration() {
        this.app.use(helmet());
        this.app.set('trust proxy', 1);

        this.app.use(session({
            name: "pwsid",
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
 

        // This is served static and public --> it could be handled by ngnix
        const dir = path.resolve(__dirname, "../client/public");
        console.log("Mounting as / =", dir);
        this.app.use(express.static(dir));
        
        this.app.engine('ejs', cons.ejs);
        this.app.set('view engine', 'ejs');
        console.log( 'Mounting views directory to ', __dirname + '/views');
        this.app.set('views', __dirname + '/views');

    }

    private loggerConfiguration() {
        console.log("configuring winston ...");
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

// serverInstance
export const appServer = HttpServer.bootstrap();

// shortcut to app instance
export const app = appServer.app;

global.__publicDir = path.resolve(__dirname, '../public'),
global.__serverDir = path.resolve(__dirname, './')
 
