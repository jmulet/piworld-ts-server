"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class AdminTasksRest {
    constructor(http) {
        this.http = http;
    }
    adminGroups() {
        const url = `@/classroom/admin/groups`;
        return this.http.get(url);
    }
}
AdminTasksRest.decorators = [
    { type: core_1.Injectable },
];
AdminTasksRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.AdminTasksRest = AdminTasksRest;
//# sourceMappingURL=AdminTasksRest.js.map