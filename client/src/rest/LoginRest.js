"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class LoginRest {
    constructor(http) {
        this.http = http;
    }
    indexPage() {
        const url = `@/`;
        return this.http.get(url);
    }
    loginPage(logout) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                logout: logout + "",
            }
        });
        const url = `@/login.htm`;
        return this.http.get(url, { params: queryParams });
    }
    login(entity) {
        const url = `#/login.htm`;
        return this.http.post(url, entity);
    }
    logout() {
        const url = `@/logout`;
        return this.http.post(url, {});
    }
    changePwdPage(error) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                error: error + "",
            }
        });
        const url = `@/changepwd.htm`;
        return this.http.get(url, { params: queryParams });
    }
    changePwd(entity) {
        const url = `@/changepwd.htm`;
        return this.http.post(url, entity);
    }
    getTranslations(file, lang) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                file: file + "",
                lang: lang + "",
            }
        });
        const url = `@/translate`;
        return this.http.get(url, { params: queryParams });
    }
}
LoginRest.decorators = [
    { type: core_1.Injectable },
];
LoginRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.LoginRest = LoginRest;
//# sourceMappingURL=LoginRest.js.map