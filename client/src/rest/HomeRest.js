"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class HomeRest {
    constructor(http) {
        this.http = http;
    }
    homePage() {
        const url = `@/home.htm`;
        return this.http.get(url);
    }
    adminPage() {
        const url = `@/admin.htm`;
        return this.http.get(url);
    }
}
HomeRest.decorators = [
    { type: core_1.Injectable },
];
HomeRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.HomeRest = HomeRest;
//# sourceMappingURL=HomeRest.js.map