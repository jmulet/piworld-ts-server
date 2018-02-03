import * as express from 'express';
import { Container } from 'typedi/Container';

import { I18n } from '../services/I18n';
import { langInspector } from '../utils/LangInspector';

const i18n = Container.get(I18n);

export function ErrorMdw(error: any, request: express.Request, response: express.Response, next: express.NextFunction) {
    if (!response.headersSent) {
        let lang = response.locals.lang;
        if (!lang) {
            lang = langInspector(request, response);
        }
        var translations = i18n.generate("/errors", lang);
        console.log(error);
        if (request.headers.accept && request.headers.accept.indexOf('application/json') >= 0) {           
            // respond with json
            const httpCode = (error ||  {}).httpCode;
            response.status(httpCode || 500).send(error ||  { msg: this.i18n.i18nTranslate("500") });
        }
        else if (request.headers.accept && request.headers.accept.indexOf('text/html') >= 0) {
            // respond with html page
            response.status(500).render("errors/500", { error: error, translations: translations, lang: lang });
        }
    }
}

