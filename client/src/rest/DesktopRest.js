"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class DesktopRest {
    constructor(http) {
        this.http = http;
    }
    desktopPage() {
        const url = `@/desktop.htm`;
        return this.http.get(url);
    }
}
DesktopRest.decorators = [
    { type: core_1.Injectable },
];
DesktopRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.DesktopRest = DesktopRest;
//# sourceMappingURL=DesktopRest.js.map