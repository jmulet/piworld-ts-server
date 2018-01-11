import * as CryptoJS from 'crypto-js';
import * as express from 'express';

import { config } from '../server.config';
import { cookieParser } from '../utils/CookieParser';

export function encryptJSON(obj: object, request: express.Request, response?: express.Response): string {

    // Secret 
    const secret = cookieParser(request, config.basePrefix + "pwsid");
    // Encrypt
    try {
        var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(obj), secret).toString();
        if (response && !response.headersSent) {
            response.type('text/plain;encoding=UTF-8');
            response.send(encryptedData);
        }
        return encryptedData;
    } catch (Ex) {
        console.log(Ex);        
        if (response && !response.headersSent) {
            response.type('text/plain;encoding=UTF-8');
            response.status(500);
            response.send({error: 'Internal server error'});
        }
    }

    return null;
}

