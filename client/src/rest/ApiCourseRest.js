"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiCourseRest {
    constructor(http) {
        this.http = http;
    }
    get(id) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/course/${pathParams.id}`;
        return this.http.get(url);
    }
    list(idUser, created) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                created: created + "",
            }
        });
        const pathParams = {
            idUser: idUser,
        };
        const url = `@/api/course/list/${pathParams.idUser}`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/course/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/course/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(id) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/course/${pathParams.id}`;
        return this.http.delete(url);
    }
}
ApiCourseRest.decorators = [
    { type: core_1.Injectable },
];
ApiCourseRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiCourseRest = ApiCourseRest;
//# sourceMappingURL=ApiCourseRest.js.map