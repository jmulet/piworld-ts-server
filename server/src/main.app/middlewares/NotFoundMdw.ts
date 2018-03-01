import * as express from 'express';
import { Container } from 'typedi';

import { I18n } from '../services/I18n';
import { langInspector } from '../utils/LangInspector';


const i18n = Container.get(I18n);

export function NotFoundMdw(request: express.Request, response: express.Response, next: express.NextFunction): void {
  
    if (!response.headersSent) {
        console.log("*********** 404 ************");
        console.log("path: " + request.path + "; method: "+request.method);
        let lang = response.locals.lang;
        if (!lang) {
            lang = langInspector(request, response);
        }
      
        if (request.headers.accept && request.headers.accept.indexOf('application/json') >= 0) {
            // respond with json
            response.status(404).send({ msg: this.i18n.i18nTranslate("404") });
            return;
        }
        else if (request.headers.accept && request.headers.accept.indexOf('text/html') >= 0) {
            const translations = i18n.generate("/errors", lang);
            // respond with html page
            response.status(404).render("errors/404", { translations: translations, lang: lang });
            return;
        }
    }
    next();
}
