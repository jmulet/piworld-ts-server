"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiUsersRest {
    constructor(http) {
        this.http = http;
    }
    usersAuth(entity) {
        const url = `#/api/user/auth`;
        return this.http.post(url, entity);
    }
    logout() {
        const url = `@/api/user/logout`;
        return this.http.get(url);
    }
    list(idSchool, filter, offspring) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idSchool: idSchool + "",
                filter: filter + "",
                offspring: offspring + "",
            }
        });
        const url = `@/api/user/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/user/`;
        return this.http.post(url, entity);
    }
    importUsers(entity) {
        const url = `@/api/user/import`;
        return this.http.post(url, entity);
    }
    delete(idUser) {
        const pathParams = {
            idUser: idUser,
        };
        const url = `@/api/user/${pathParams.idUser}`;
        return this.http.delete(url);
    }
}
ApiUsersRest.decorators = [
    { type: core_1.Injectable },
];
ApiUsersRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiUsersRest = ApiUsersRest;
//# sourceMappingURL=ApiUsersRest.js.map