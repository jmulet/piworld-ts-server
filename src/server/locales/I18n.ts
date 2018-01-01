import * as fs from "fs";
import { Service } from "typedi";

@Service()
export class I18n {
    public static DEFAULT_LANG = "en";
    public static SUPPORTED_LANGS = ["ca", "es", "en"];
    private TRANSLATIONS = {};

    constructor() {
        this.init();
    }
    // init: Load all translations files into TRANSLATION object
    init() {
        this.TRANSLATIONS = {};

        try {

            I18n.SUPPORTED_LANGS.forEach((lang) => {
                try {
                    this.TRANSLATIONS[lang] = require("./locale_" + lang + ".json");
                } catch (Ex) {
                    this.TRANSLATIONS[lang] = {};
                }
            });
            console.log("Translations files have been loaded");
        } catch (Ex) {
            console.log(Ex);
        }

    }

    // Generate all translations for a given view path and lang
    generate(path: string, lang: string) {        
        let tlang = this.TRANSLATIONS[lang];
        if (!tlang) {
            tlang = {};
        }
        let ltpath = tlang[path];
        if (!ltpath) {
            ltpath = {};
        }
        return ltpath;
    }

    // Generates a translation function for the given translations object
    i18nTranslate(translations: any) {

        return (key) => {
            return translations[key] ||  key;
        };

    }

}