import { cookieParser } from '../utils/CookieParser';
import { ExpressMiddlewareInterface} from 'routing-controllers';
import * as express from 'express';
import { SessionModel } from "../model/SessionModel";
import * as CryptoJS from 'crypto-js';
import { config } from '../server.config'; 

export class DecryptBodyMdw implements ExpressMiddlewareInterface {

    use(request: express.Request, response: express.Response, next?: (err?: any) => any): any {
            if (request.headers["content-type"].indexOf("text/plain;charset=UTF-8") >=0 ) {
                let body: string = request.body;                
                // Do decryption here            
                // Secret 
                const secret = cookieParser(request, config.basePrefix+"pwsid");
                // Decrypt
                try {
                    var bytes = CryptoJS.AES.decrypt(body, secret);
                    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                    body = JSON.parse(decryptedData);
                    // Replace with the parsed body
                    request.body = body;
                } catch(Ex) {
                    console.log(Ex);
                    return response.status(400).send(Ex);
                }               
            }
            next();
    }

}