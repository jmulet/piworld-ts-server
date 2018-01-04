import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Inject } from 'typedi';

import { I18n } from '../services/I18n';
import { cookieParser } from '../utils/CookieParser';
import { langInspector } from '../utils/LangInspector';
import { config } from '../server.config';
export class TranslationMdw implements ExpressMiddlewareInterface {

    @Inject()
    i18n: I18n;

    use(request: any, response: any, next?: (err?: any) => any): any {

        const lang = langInspector(request, response);        
        const cpath = request.path.split(".")[0].substring(config.basePrefix.length);
        const translations = this.i18n.generate(cpath, lang); 

        response.locals.translations = translations;
        response.locals.__ = this.i18n.i18nTranslate(translations);
        response.locals.lang = lang;
        
        console.log(response.locals);
        next();        
        
    }

}