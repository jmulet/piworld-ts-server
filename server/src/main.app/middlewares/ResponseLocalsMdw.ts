import * as express from 'express';
import { config } from '../../server.config';
import { I18n } from '../services/I18n';
import * as path from 'path';
import { langInspector } from '../utils/LangInspector';

const packageJson = require('../../../package.json'); 

export function ResponseLocalsMdw(request: express.Request, response: express.Response, next: express.NextFunction) {

    const session = request.session;
    const user: any = {};
    if (session.user) {
        user.id = session.user.id;
        user.fullname = session.user.fullname;
        user.username = session.user.username;
        user.idRole = session.user.idRole;
        user.schoolId = session.user.schoolId;
    }

    // Pass a couple of configuration properties to the view engine
    response.locals.config = {
        basePrefix: config.basePrefix,
        staticPrefix: config.staticPrefix,
        defaultLang: I18n.DEFAULT_LANG,
        user: user,
        version: packageJson.version,
        author: packageJson.author
    };

    // Pass the lang
    response.locals.lang = langInspector(request, response);

    response.locals.prefixUrl = function (url){
        return path.join(config.basePrefix, url);
    };
 
    next();
}
