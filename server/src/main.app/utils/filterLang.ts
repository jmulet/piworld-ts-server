import { I18n } from "../services/I18n";

// This function filters the correct lang in a json field

export function filterLang(result, fields, lang) {

    result.forEach( (e, i) => {
        fields.forEach( (f) => {
            const json = e[f] || {};
            result[i][f] = json[lang] || json[I18n.DEFAULT_LANG] || json.stringify();
        });
    });

    return result;
}