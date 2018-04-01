"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiSchoolHolidayRest {
    constructor(http) {
        this.http = http;
    }
    get(idHoliday) {
        const pathParams = {
            idHoliday: idHoliday,
        };
        const url = `@/api/school/holiday/${pathParams.idHoliday}`;
        return this.http.get(url);
    }
    list(year, idSchool, schoolName) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                year: year + "",
                idSchool: idSchool + "",
                schoolName: schoolName + "",
            }
        });
        const url = `@/api/school/holiday/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/school/holiday/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/school/holiday/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idHoliday) {
        const pathParams = {
            idHoliday: idHoliday,
        };
        const url = `@/api/school/holiday/${pathParams.idHoliday}`;
        return this.http.delete(url);
    }
}
ApiSchoolHolidayRest.decorators = [
    { type: core_1.Injectable },
];
ApiSchoolHolidayRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiSchoolHolidayRest = ApiSchoolHolidayRest;
//# sourceMappingURL=ApiSchoolHolidayRest.js.map