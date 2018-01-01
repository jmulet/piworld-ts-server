import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Inject } from 'typedi';

import { I18n } from '../locales/I18n';
import { cookieParser } from './CookieParser';

export class TranslationMdw implements ExpressMiddlewareInterface {

    @Inject()
    i18n: I18n;

    use(request: any, response: any, next?: (err?: any) => any): any {

        let lang;
        // First check for queryParameter clang
        lang = ( request.query["clang"] || "" ).toLowerCase();
        if (I18n.SUPPORTED_LANGS.indexOf(lang) < 0) {
            lang = null;
        } else {
            // set a cookie to prevent using queryParameters on future requests
            response.cookie("clang", lang);
        }

        if (!lang) {
            if(request.headers.cookie) {
                // Second check for a lang cookie
                lang = (cookieParser(request, "clang") || "").toLowerCase();
                if (I18n.SUPPORTED_LANGS.indexOf(lang) < 0) {
                    lang = null;
                }
            }
            if (!lang) {
                // Finally, look for request header
                lang = (request.acceptsLanguages(I18n.SUPPORTED_LANGS) || I18n.DEFAULT_LANG).toLowerCase();                       
                if (I18n.SUPPORTED_LANGS.indexOf(lang) < 0) {
                    lang = I18n.DEFAULT_LANG;
                }        
            }
        }
        
        const cpath = request.path.split(".")[0];
        const translations = this.i18n.generate(cpath, lang); 

        response.locals = {
            translations: translations,
            __: this.i18n.i18nTranslate(translations),
            lang: lang
        };
     
        next();        
        
    }

}