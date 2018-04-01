"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiSubjectRest {
    constructor(http) {
        this.http = http;
    }
    list() {
        const url = `@/api/subject/list`;
        return this.http.get(url);
    }
}
ApiSubjectRest.decorators = [
    { type: core_1.Injectable },
];
ApiSubjectRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiSubjectRest = ApiSubjectRest;
//# sourceMappingURL=ApiSubjectRest.js.map