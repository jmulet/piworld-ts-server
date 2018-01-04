import { ExpressMiddlewareInterface} from 'routing-controllers';
import * as express from 'express';
import { SessionModel } from "../model/SessionModel";

export class EncryptedBodyMdw implements ExpressMiddlewareInterface {

    use(request: express.Request, response: express.Response, next?: (err?: any) => any): any {
            if (request.headers.accept.indexOf("text/plain;charset=UTF-8") >=0 ) {
                let body = request.body;
                // Do decryption here
                body = JSON.parse(body);
                // Replace with the parsed body
                request.body = body;
            }
    }

}