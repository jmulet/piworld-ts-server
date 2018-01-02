
import * as express from "express";
import {Middleware, ExpressMiddlewareInterface} from "routing-controllers";
import { Inject } from "typedi";
import { I18n } from "../services/I18n";
import { cookieParser } from "./CookieParser";

@Middleware({ type: "after" })
export class NotFoundMdw implements ExpressMiddlewareInterface {

    @Inject()
    i18n: I18n;
    
    use(request: express.Request, response: express.Response, next: express.NextFunction): void {
        if (!response.headersSent) {
            let lang = response.locals.lang;
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
                  }
            }
            if (I18n.SUPPORTED_LANGS.indexOf(lang) < 0) {
                lang = I18n.DEFAULT_LANG;
            }        

            
            var translations = this.i18n.generate("/errors", lang);

            if (request.headers.accept.indexOf('application/json') >= 0) {
                // respond with json
                response.status(404).send({msg: this.i18n.i18nTranslate("404")});
                return;
            }            
            else {
                // respond with html page
                response.status(404).render("errors/404", {translations: translations, lang: lang});
                return;
            }            
        }
        next();
    }

}