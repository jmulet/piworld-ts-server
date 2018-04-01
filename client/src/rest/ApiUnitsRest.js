"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiUnitsRest {
    constructor(http) {
        this.http = http;
    }
    listAssigned(idCourse, idUser) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idUser: idUser + "",
            }
        });
        const pathParams = {
            idCourse: idCourse,
        };
        const url = `@/api/units/assigned/${pathParams.idCourse}`;
        return this.http.get(url, { params: queryParams });
    }
    listCreated(idCourse) {
        const pathParams = {
            idCourse: idCourse,
        };
        const url = `@/api/units/created/${pathParams.idCourse}`;
        return this.http.get(url);
    }
    listUnitsOnly(idCourse) {
        const pathParams = {
            idCourse: idCourse,
        };
        const url = `@/api/units/list/${pathParams.idCourse}`;
        return this.http.get(url);
    }
    save(entity) {
        const url = `@/api/units/`;
        return this.http.post(url, entity);
    }
    saveOrdering(entity) {
        const url = `@/api/units/`;
        return this.http.put(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/units/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idUnit) {
        const pathParams = {
            idUnit: idUnit,
        };
        const url = `@/api/units/${pathParams.idUnit}`;
        return this.http.delete(url);
    }
}
ApiUnitsRest.decorators = [
    { type: core_1.Injectable },
];
ApiUnitsRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiUnitsRest = ApiUnitsRest;
//# sourceMappingURL=ApiUnitsRest.js.map