import * as express from "express";
import { cookieParser } from "./CookieParser";
import { I18n } from "../services/I18n";

export function langInspector(request: express.Request, response?: express.Response) {
    let lang;

    // First check for queryParameter clang
    lang = (request.query["clang"] || "").toLowerCase();
    if (I18n.SUPPORTED_LANGS.indexOf(lang) < 0) {
        lang = null;
    } else if (response) {
        // set a cookie to avoid using queryParameters on future requests
        response.cookie("clang", lang);
    }

    // Second check for a clang cookie
    if (!lang && request.headers.cookie) {
        lang = (cookieParser(request, "clang") || "").toLowerCase();
        if (I18n.SUPPORTED_LANGS.indexOf(lang) < 0) {
            lang = null;
        }
    }

    // Finally, look for request header
    if (!lang) {
        lang = (request.acceptsLanguages(I18n.SUPPORTED_LANGS) || I18n.DEFAULT_LANG).toLowerCase();
        if (I18n.SUPPORTED_LANGS.indexOf(lang) < 0) {
            lang = I18n.DEFAULT_LANG;
        }
    }


    return lang;
}
