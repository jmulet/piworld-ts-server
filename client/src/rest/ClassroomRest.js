"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ClassroomRest {
    constructor(http) {
        this.http = http;
    }
    desktopPage() {
        const url = `@/classroom/`;
        return this.http.get(url);
    }
}
ClassroomRest.decorators = [
    { type: core_1.Injectable },
];
ClassroomRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ClassroomRest = ClassroomRest;
//# sourceMappingURL=ClassroomRest.js.map