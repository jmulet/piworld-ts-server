"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiBadgesRest {
    constructor(http) {
        this.http = http;
    }
    list(idGroup, idUser, fromType, toType, fromDate, toDate) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idGroup: idGroup + "",
                idUser: idUser + "",
                fromType: fromType + "",
                toType: toType + "",
                fromDate: fromDate + "",
                toDate: toDate + "",
            }
        });
        const url = `@/api/badges/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/badges/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/badges/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idBadge) {
        const pathParams = {
            idBadge: idBadge,
        };
        const url = `@/api/badges/${pathParams.idBadge}`;
        return this.http.delete(url);
    }
}
ApiBadgesRest.decorators = [
    { type: core_1.Injectable },
];
ApiBadgesRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiBadgesRest = ApiBadgesRest;
//# sourceMappingURL=ApiBadgesRest.js.map