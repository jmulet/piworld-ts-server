import * as express from "express";
import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";
import { I18n } from "../services/I18n";
import { Inject } from "typedi";
import { cookieParser } from "./CookieParser";

@Middleware({ type: "after" })
export class ErrorMdw implements ExpressErrorMiddlewareInterface {

    @Inject()
    i18n: I18n;

    error(error: any, request: express.Request, response: express.Response, next: express.NextFunction ) {
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
                response.status(500).send({ msg: this.i18n.i18nTranslate("500"), error: error});
                return;
            }            
            else {
                // respond with html page
                response.status(500).render("errors/500", {error: error, translations: translations, lang: lang});
                return;
            }            
        }
    }

}