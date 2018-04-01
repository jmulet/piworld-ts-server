"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiSectionRest {
    constructor(http) {
        this.http = http;
    }
    save(entity) {
        const url = `@/api/section/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/section/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idSection) {
        const pathParams = {
            idSection: idSection,
        };
        const url = `@/api/section/${pathParams.idSection}`;
        return this.http.delete(url);
    }
}
ApiSectionRest.decorators = [
    { type: core_1.Injectable },
];
ApiSectionRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiSectionRest = ApiSectionRest;
//# sourceMappingURL=ApiSectionRest.js.map