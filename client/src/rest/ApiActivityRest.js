"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiActivityRest {
    constructor(http) {
        this.http = http;
    }
    search(text, limit, offset) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                text: text + "",
                limit: limit + "",
                offset: offset + "",
            }
        });
        const url = `@/api/activity/search`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/activity/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/activity/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idActivity) {
        const pathParams = {
            idActivity: idActivity,
        };
        const url = `@/api/activity/${pathParams.idActivity}`;
        return this.http.delete(url);
    }
}
ApiActivityRest.decorators = [
    { type: core_1.Injectable },
];
ApiActivityRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiActivityRest = ApiActivityRest;
//# sourceMappingURL=ApiActivityRest.js.map