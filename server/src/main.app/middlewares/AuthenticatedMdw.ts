import { ExpressMiddlewareInterface} from 'routing-controllers';
import * as express from 'express';
import { SessionModel } from "../model/SessionModel";
import { config } from '../../server.config';
import { PwHttpServer } from '../../server';
import * as querystring from 'querystring';

export class AuthenticatedMdw implements ExpressMiddlewareInterface {

    use(request: express.Request, response: express.Response, next?: (err?: any) => any): any {
       
        // This prevents back button navigation when logged out
        response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        const session = request.session;
        if (!request.session || !request.session.connectSid) {
            console.log("Sorry! You need authentication to access route " + request.path);
            console.log(session);
            if (request.headers && request.headers.accept && request.headers.accept.indexOf('application/json') >= 0) {
                response.status(403).send({ error: 'User not authenticated' });
            }
            else {
                // Pass the current path as a parameter to login page
                let redirect = config.basePrefix + "/login.htm";
                redirect += "?path=" + querystring.escape(request.path);
                response.redirect(redirect);
            }
        } else {
            next();
        }
    }

}