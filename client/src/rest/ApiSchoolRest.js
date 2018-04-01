"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiSchoolRest {
    constructor(http) {
        this.http = http;
    }
    list(idSchool) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idSchool: idSchool + "",
            }
        });
        const url = `@/api/school/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/school/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/school/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idSchool) {
        const pathParams = {
            idSchool: idSchool,
        };
        const url = `@/api/school/${pathParams.idSchool}`;
        return this.http.delete(url);
    }
}
ApiSchoolRest.decorators = [
    { type: core_1.Injectable },
];
ApiSchoolRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiSchoolRest = ApiSchoolRest;
//# sourceMappingURL=ApiSchoolRest.js.map