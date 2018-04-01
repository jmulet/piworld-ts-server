"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class AdminRest {
    constructor(http) {
        this.http = http;
    }
    adminHomePage() {
        const url = `@/admin/`;
        return this.http.get(url);
    }
}
AdminRest.decorators = [
    { type: core_1.Injectable },
];
AdminRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.AdminRest = AdminRest;
//# sourceMappingURL=AdminRest.js.map