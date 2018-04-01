"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiSchoolTermRest {
    constructor(http) {
        this.http = http;
    }
    get(idTerm) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idTerm: idTerm + "",
            }
        });
        const url = `@/api/school/term/`;
        return this.http.get(url, { params: queryParams });
    }
    list(year, idSchool, schoolName) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                year: year + "",
                idSchool: idSchool + "",
                schoolName: schoolName + "",
            }
        });
        const url = `@/api/school/term/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/school/term/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/school/term/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idTerm) {
        const pathParams = {
            idTerm: idTerm,
        };
        const url = `@/api/school/term/${pathParams.idTerm}`;
        return this.http.delete(url);
    }
}
ApiSchoolTermRest.decorators = [
    { type: core_1.Injectable },
];
ApiSchoolTermRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiSchoolTermRest = ApiSchoolTermRest;
//# sourceMappingURL=ApiSchoolTermRest.js.map