import * as express from "express";
import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";
import { I18n } from "../services/I18n";
import { Inject } from "typedi";
import { cookieParser } from "../utils/CookieParser";
import { langInspector } from "../utils/LangInspector";

@Middleware({ type: "after" })
export class ErrorMdw implements ExpressErrorMiddlewareInterface {

    @Inject()
    i18n: I18n;

    error(error: any, request: express.Request, response: express.Response, next: express.NextFunction ) {
        if (!response.headersSent) {
            let lang = response.locals.lang;
            if (!lang) {
                lang = langInspector(request, response);
            }
            var translations = this.i18n.generate("/errors", lang);

            if (request.headers.accept && request.headers.accept.indexOf('application/json') >= 0) {
                console.log("Estic enviant un error que pot esser de validació");
                console.log(response);
                // respond with json
                const httpCode = ( error || {} ).httpCode;
                response.status(httpCode || 500).send(error || { msg: this.i18n.i18nTranslate("500")});
            }            
            else if (request.headers.accept && request.headers.accept.indexOf('text/html') >= 0) {
                // respond with html page
                response.status(500).render("errors/500", {error: error, translations: translations, lang: lang});
            }            
        }
    }

}