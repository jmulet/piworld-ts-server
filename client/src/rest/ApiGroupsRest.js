"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiGroupsRest {
    constructor(http) {
        this.http = http;
    }
    list(idCourse, idCreator) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idCourse: idCourse + "",
                idCreator: idCreator + "",
            }
        });
        const url = `@/api/group/list`;
        return this.http.get(url, { params: queryParams });
    }
    get(idGroup) {
        const pathParams = {
            idGroup: idGroup,
        };
        const url = `@/api/group/${pathParams.idGroup}`;
        return this.http.get(url);
    }
    save(entity) {
        const url = `@/api/group/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/group/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idGroup) {
        const pathParams = {
            idGroup: idGroup,
        };
        const url = `@/api/group/${pathParams.idGroup}`;
        return this.http.delete(url);
    }
}
ApiGroupsRest.decorators = [
    { type: core_1.Injectable },
];
ApiGroupsRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiGroupsRest = ApiGroupsRest;
//# sourceMappingURL=ApiGroupsRest.js.map