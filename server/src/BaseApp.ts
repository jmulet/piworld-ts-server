import * as colors from 'colors/safe';
import * as consolidate from 'consolidate';
import * as express from 'express';
import { useExpressServer } from 'routing-controllers';

import { config } from './server.config';

export interface AppConfigOptions {
    isAdmin: boolean,
    mountPoint: string,
    path: string,
    name: string,
    icon: string
}

export abstract class BaseApp {

     app: express.Application;
    
    config: AppConfigOptions = {
        isAdmin: false,
        mountPoint: "/",
        path: "",
        name: "App",
        icon: ""
    };

    
    
    constructor() {
        this.app = express();       
    }

    create(appName: string, dirname: string) {
        this.config.name = appName;
        console.log(colors.magenta("Creating app " + appName + " ..."));

        // reuses express app, registers all controller routes 
        useExpressServer(this.app, {
            defaultErrorHandler: false,
            // we specify controllers we want to use
            controllers: [
                dirname + "/controllers/*.ts",
                dirname + "/controllers/*.js",
                dirname + "/controllers/**/*.ts",
                dirname + "/controllers/**/*.js",
            ],
            routePrefix: config.basePrefix,
            // Disable validation by default - enabled it in controllers
            validation: true,
            classTransformer: true
        });


        this.app.engine('ejs', consolidate.ejs);
        this.app.set('view engine', 'ejs');
        console.log('Mounting views:: ', dirname + '/views');
        this.app.set('views', dirname + '/views');


        // Finally show all routes
        if (process.env.NODE_ENV !== 'production') {
            console.log("Mounted routes: ");
            ((this.app._router || {}).stack || []).forEach(function (e) {
                if (e.route) {
                    const method = (Object.keys(e.route.methods)[0] || "").toUpperCase();
                    let colorify;
                    if(method==="DELETE") {
                        colorify = colors.red;
                    } else if(method==="GET") {
                        colorify = colors.cyan;
                    } else if(method==="POST" || method==="PUT") {
                        colorify = colors.green;
                    } 
                    else {
                       colorify = colors.grey;
                    }
                    console.log( colorify(method + "\t\t" + e.route.path));
                }
            });
        }
    }

}

