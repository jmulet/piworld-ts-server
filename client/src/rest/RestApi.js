"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
class RestApi {
    constructor(http) {
        this.http = http;
        this.Desktop = new DesktopRest(http);
        this.Home = new HomeRest(http);
        this.Login = new LoginRest(http);
        this.ApiSchool = new ApiSchoolRest(http);
        this.ApiSchoolHoliday = new ApiSchoolHolidayRest(http);
        this.ApiSchoolTerm = new ApiSchoolTermRest(http);
        this.ApiSubject = new ApiSubjectRest(http);
        this.ApiUsers = new ApiUsersRest(http);
        this.Admin = new AdminRest(http);
        this.AdminTasks = new AdminTasksRest(http);
        this.Classroom = new ClassroomRest(http);
        this.ApiActivity = new ApiActivityRest(http);
        this.ApiBadges = new ApiBadgesRest(http);
        this.ApiChallenges = new ApiChallengesRest(http);
        this.ApiCourse = new ApiCourseRest(http);
        this.ApiGroups = new ApiGroupsRest(http);
        this.ApiSection = new ApiSectionRest(http);
        this.ApiUnits = new ApiUnitsRest(http);
    }
}
RestApi.decorators = [
    { type: core_1.Injectable },
];
RestApi.ctorParameters = () => [
    { type: http_1.HttpClient, },
];
exports.RestApi = RestApi;
class DesktopRest {
    constructor(http) {
        this.http = http;
    }
    desktopPage() {
        const url = `@/desktop.htm`;
        return this.http.get(url);
    }
}
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
class LoginRest {
    constructor(http) {
        this.http = http;
    }
    indexPage() {
        const url = `@/`;
        return this.http.get(url);
    }
    loginPage(logout) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                logout: logout + "",
            }
        });
        const url = `@/login.htm`;
        return this.http.get(url, { params: queryParams });
    }
    login(entity) {
        const url = `#/login.htm`;
        return this.http.post(url, entity);
    }
    logout() {
        const url = `@/logout`;
        return this.http.post(url, {});
    }
    changePwdPage(error) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                error: error + "",
            }
        });
        const url = `@/changepwd.htm`;
        return this.http.get(url, { params: queryParams });
    }
    changePwd(entity) {
        const url = `@/changepwd.htm`;
        return this.http.post(url, entity);
    }
    getTranslations(file, lang) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                file: file + "",
                lang: lang + "",
            }
        });
        const url = `@/translate`;
        return this.http.get(url, { params: queryParams });
    }
}
class ApiSchoolRest {
    constructor(http) {
        this.http = http;
    }
    list(idSchool) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idSchool: idSchool + "",
            }
        });
        const url = `@/api/school/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/school/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/school/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idSchool) {
        const pathParams = {
            idSchool: idSchool,
        };
        const url = `@/api/school/${pathParams.idSchool}`;
        return this.http.delete(url);
    }
}
class ApiSchoolHolidayRest {
    constructor(http) {
        this.http = http;
    }
    get(idHoliday) {
        const pathParams = {
            idHoliday: idHoliday,
        };
        const url = `@/api/school/holiday/${pathParams.idHoliday}`;
        return this.http.get(url);
    }
    list(year, idSchool, schoolName) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                year: year + "",
                idSchool: idSchool + "",
                schoolName: schoolName + "",
            }
        });
        const url = `@/api/school/holiday/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/school/holiday/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/school/holiday/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idHoliday) {
        const pathParams = {
            idHoliday: idHoliday,
        };
        const url = `@/api/school/holiday/${pathParams.idHoliday}`;
        return this.http.delete(url);
    }
}
class ApiSchoolTermRest {
    constructor(http) {
        this.http = http;
    }
    get(idTerm) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idTerm: idTerm + "",
            }
        });
        const url = `@/api/school/term/`;
        return this.http.get(url, { params: queryParams });
    }
    list(year, idSchool, schoolName) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                year: year + "",
                idSchool: idSchool + "",
                schoolName: schoolName + "",
            }
        });
        const url = `@/api/school/term/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/school/term/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/school/term/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idTerm) {
        const pathParams = {
            idTerm: idTerm,
        };
        const url = `@/api/school/term/${pathParams.idTerm}`;
        return this.http.delete(url);
    }
}
class ApiSubjectRest {
    constructor(http) {
        this.http = http;
    }
    list() {
        const url = `@/api/subject/list`;
        return this.http.get(url);
    }
}
class ApiUsersRest {
    constructor(http) {
        this.http = http;
    }
    usersAuth(entity) {
        const url = `#/api/user/auth`;
        return this.http.post(url, entity);
    }
    logout() {
        const url = `@/api/user/logout`;
        return this.http.get(url);
    }
    list(idSchool, filter, offspring) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idSchool: idSchool + "",
                filter: filter + "",
                offspring: offspring + "",
            }
        });
        const url = `@/api/user/list`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/user/`;
        return this.http.post(url, entity);
    }
    importUsers(entity) {
        const url = `@/api/user/import`;
        return this.http.post(url, entity);
    }
    delete(idUser) {
        const pathParams = {
            idUser: idUser,
        };
        const url = `@/api/user/${pathParams.idUser}`;
        return this.http.delete(url);
    }
}
class AdminRest {
    constructor(http) {
        this.http = http;
    }
    adminHomePage() {
        const url = `@/admin/`;
        return this.http.get(url);
    }
}
class AdminTasksRest {
    constructor(http) {
        this.http = http;
    }
    adminGroups() {
        const url = `@/classroom/admin/groups`;
        return this.http.get(url);
    }
}
class ClassroomRest {
    constructor(http) {
        this.http = http;
    }
    desktopPage() {
        const url = `@/classroom/`;
        return this.http.get(url);
    }
}
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
class ApiCourseRest {
    constructor(http) {
        this.http = http;
    }
    get(id) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/course/${pathParams.id}`;
        return this.http.get(url);
    }
    list(idUser, created) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                created: created + "",
            }
        });
        const pathParams = {
            idUser: idUser,
        };
        const url = `@/api/course/list/${pathParams.idUser}`;
        return this.http.get(url, { params: queryParams });
    }
    save(entity) {
        const url = `@/api/course/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/course/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(id) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/course/${pathParams.id}`;
        return this.http.delete(url);
    }
}
class ApiGroupsRest {
    constructor(http) {
        this.http = http;
    }
    list(idCourse, idCreator) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idCourse: idCourse + "",
                idCreator: idCreator + "",
            }
        });
        const url = `@/api/group/list`;
        return this.http.get(url, { params: queryParams });
    }
    get(idGroup) {
        const pathParams = {
            idGroup: idGroup,
        };
        const url = `@/api/group/${pathParams.idGroup}`;
        return this.http.get(url);
    }
    save(entity) {
        const url = `@/api/group/`;
        return this.http.post(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/group/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idGroup) {
        const pathParams = {
            idGroup: idGroup,
        };
        const url = `@/api/group/${pathParams.idGroup}`;
        return this.http.delete(url);
    }
}
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
class ApiUnitsRest {
    constructor(http) {
        this.http = http;
    }
    listAssigned(idCourse, idUser) {
        const queryParams = new http_1.HttpParams({
            fromObject: {
                idUser: idUser + "",
            }
        });
        const pathParams = {
            idCourse: idCourse,
        };
        const url = `@/api/units/assigned/${pathParams.idCourse}`;
        return this.http.get(url, { params: queryParams });
    }
    listCreated(idCourse) {
        const pathParams = {
            idCourse: idCourse,
        };
        const url = `@/api/units/created/${pathParams.idCourse}`;
        return this.http.get(url);
    }
    listUnitsOnly(idCourse) {
        const pathParams = {
            idCourse: idCourse,
        };
        const url = `@/api/units/list/${pathParams.idCourse}`;
        return this.http.get(url);
    }
    save(entity) {
        const url = `@/api/units/`;
        return this.http.post(url, entity);
    }
    saveOrdering(entity) {
        const url = `@/api/units/`;
        return this.http.put(url, entity);
    }
    update(id, entity) {
        const pathParams = {
            id: id,
        };
        const url = `@/api/units/${pathParams.id}`;
        return this.http.put(url, entity);
    }
    delete(idUnit) {
        const pathParams = {
            idUnit: idUnit,
        };
        const url = `@/api/units/${pathParams.idUnit}`;
        return this.http.delete(url);
    }
}
//# sourceMappingURL=RestApi.js.map