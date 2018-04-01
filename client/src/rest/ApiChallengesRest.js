"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class ApiChallengesRest {
    constructor(http) {
        this.http = http;
    }
    list(level, day, idUser) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                level: level + "",
                day: day + "",
                idUser: idUser + "",
            }
        });
        const url = `@/api/challenges/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/challenges/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/challenges/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idChallenge) {
        const pathParams = {
            idChallenge: idChallenge,
        };
        const url = `@/api/challenges/${pathParams.idChallenge}`;
        return this.http.delete(url);
    }
}
ApiChallengesRest.decorators = [
    { type: core_1.Injectable },
];
ApiChallengesRest.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.ApiChallengesRest = ApiChallengesRest;
//# sourceMappingURL=ApiChallengesRest.js.map