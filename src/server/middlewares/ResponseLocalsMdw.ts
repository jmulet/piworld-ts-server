import * as express from 'express';

import { config } from '../server.config';
import { I18n } from '../services/I18n';
import * as path from 'path';
 

export function ResponseLocalsMdw(request: express.Request, response: express.Response, next: express.NextFunction) {

    // Pass a couple of configuration properties to the view engine
    response.locals.config = {
        basePrefix: config.basePrefix,
        staticPrefix: config.staticPrefix,
        defaultLang: I18n.DEFAULT_LANG
    };

    response.locals.prefixUrl = function (url){
        return path.join(config.basePrefix, url);
    };

    next();
}
