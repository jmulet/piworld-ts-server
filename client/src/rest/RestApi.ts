import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchoolModel } from "../entities/SchoolModel" 
import { HolidayModel } from "../entities/HolidayModel" 
import { TermsModel } from "../entities/TermsModel" 
import { UserModel } from "../entities/UserModel" 
import { ActivityModel } from "../entities/ActivityModel" 
import { BadgesModel } from "../entities/BadgesModel" 
import { ChallengesModel } from "../entities/ChallengesModel" 
import { CourseModel } from "../entities/CourseModel" 
import { GroupsModel } from "../entities/GroupsModel" 
import { SectionModel } from "../entities/SectionModel" 
import { UnitModel } from "../entities/UnitModel" 


@Injectable()
export class RestApi {
Desktop: DesktopRest;
Home: HomeRest;
Login: LoginRest;
ApiSchool: ApiSchoolRest;
ApiSchoolHoliday: ApiSchoolHolidayRest;
ApiSchoolTerm: ApiSchoolTermRest;
ApiSubject: ApiSubjectRest;
ApiUsers: ApiUsersRest;
Admin: AdminRest;
AdminTasks: AdminTasksRest;
Classroom: ClassroomRest;
ApiActivity: ApiActivityRest;
ApiBadges: ApiBadgesRest;
ApiChallenges: ApiChallengesRest;
ApiCourse: ApiCourseRest;
ApiGroups: ApiGroupsRest;
ApiSection: ApiSectionRest;
ApiUnits: ApiUnitsRest;
constructor(private http: HttpClient) {
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

 class DesktopRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/desktop.htm
 * @apiName desktopPage
 * @apiGroup DesktopController
*/
desktopPage() {
   return this.http.get("@/desktop.htm");
}
}


 class HomeRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/home.htm
 * @apiName homePage
 * @apiGroup HomeController
*/
homePage() {
   return this.http.get("@/home.htm");
}
/**
 * @api {get} @/admin.htm
 * @apiName adminPage
 * @apiGroup HomeController
 * @apiPermission Accepted roles 50, 0
*/
adminPage() {
   return this.http.get("@/admin.htm");
}
}


 class LoginRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/
 * @apiName indexPage
 * @apiGroup LoginController
*/
indexPage() {
   return this.http.get("@/");
}
/**
 * @api {get} @/login.htm
 * @apiName loginPage
 * @apiGroup LoginController
*/
loginPage(logout?: Object) {
const queryParams = new HttpParams({
   fromObject: {
      logout: logout + "",
  }
});
   return this.http.get("@/login.htm", {params: queryParams});
}
/**
 * @api {post} #/login.htm
 * @apiName login
 * @apiGroup LoginController
*/
login(entity: any) {
   return this.http.post("#/login.htm", entity);
}
/**
 * @api {post} @/logout
 * @apiName logout
 * @apiGroup LoginController
*/
logout() {
   return this.http.post("@/logout", {});
}
/**
 * @api {get} @/changepwd.htm
 * @apiName changePwdPage
 * @apiGroup LoginController
*/
changePwdPage(error?: number) {
const queryParams = new HttpParams({
   fromObject: {
      error: error + "",
  }
});
   return this.http.get("@/changepwd.htm", {params: queryParams});
}
/**
 * @api {post} @/changepwd.htm
 * @apiName changePwd
 * @apiGroup LoginController
*/
changePwd(entity: any) {
   return this.http.post("@/changepwd.htm", entity);
}
/**
 * @api {get} @/translate
 * @apiName getTranslations
 * @apiGroup LoginController
*/
getTranslations(file: string, lang?: string) {
const queryParams = new HttpParams({
   fromObject: {
      file: file + "",
      lang: lang + "",
  }
});
   return this.http.get("@/translate", {params: queryParams});
}
}


 class ApiSchoolRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/school/list
 * @apiName list
 * @apiGroup ApiSchoolController
 * @apiPermission Accepted roles 0, 50
*/
list(idSchool?: number) {
const queryParams = new HttpParams({
   fromObject: {
      idSchool: idSchool + "",
  }
});
   return this.http.get("@/api/school/list", {params: queryParams});
}
/**
 * @api {post} @/api/school/
 * @apiName save
 * @apiGroup ApiSchoolController
 * @apiPermission Accepted roles 0, 50
*/
save(entity: SchoolModel) {
   return this.http.post("@/api/school/", entity);
}
/**
 * @api {put} @/api/school/:id
 * @apiName update
 * @apiGroup ApiSchoolController
 * @apiPermission Accepted roles 0, 50
*/
update(id: number, entity: SchoolModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/school/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/school/:idSchool
 * @apiName delete
 * @apiGroup ApiSchoolController
 * @apiPermission Accepted roles 0
*/
delete(idSchool: number) {
const pathParams = {
      idSchool: idSchool,
};
   return this.http.delete("@/api/school/${pathParams.idSchool}");
}
}


 class ApiSchoolHolidayRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/school/holiday/:idHoliday
 * @apiName get
 * @apiGroup ApiSchoolHolidayController
 * @apiPermission Accepted roles 0
*/
get(idHoliday: number) {
const pathParams = {
      idHoliday: idHoliday,
};
   return this.http.get("@/api/school/holiday/${pathParams.idHoliday}");
}
/**
 * @api {get} @/api/school/holiday/list
 * @apiName list
 * @apiGroup ApiSchoolHolidayController
 * @apiPermission Accepted roles 0, 50
*/
list(year: number, idSchool?: number, schoolName?: string) {
const queryParams = new HttpParams({
   fromObject: {
      year: year + "",
      idSchool: idSchool + "",
      schoolName: schoolName + "",
  }
});
   return this.http.get("@/api/school/holiday/list", {params: queryParams});
}
/**
 * @api {post} @/api/school/holiday/
 * @apiName save
 * @apiGroup ApiSchoolHolidayController
*/
save(entity: HolidayModel) {
   return this.http.post("@/api/school/holiday/", entity);
}
/**
 * @api {put} @/api/school/holiday/:id
 * @apiName update
 * @apiGroup ApiSchoolHolidayController
 * @apiPermission Accepted roles 0, 50
*/
update(id: number, entity: HolidayModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/school/holiday/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/school/holiday/:idHoliday
 * @apiName delete
 * @apiGroup ApiSchoolHolidayController
 * @apiPermission Accepted roles 0
*/
delete(idHoliday: number) {
const pathParams = {
      idHoliday: idHoliday,
};
   return this.http.delete("@/api/school/holiday/${pathParams.idHoliday}");
}
}


 class ApiSchoolTermRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/school/term/
 * @apiName get
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0
*/
get(idTerm?: number) {
const queryParams = new HttpParams({
   fromObject: {
      idTerm: idTerm + "",
  }
});
   return this.http.get("@/api/school/term/", {params: queryParams});
}
/**
 * @api {get} @/api/school/term/list
 * @apiName list
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0, 50
*/
list(year: number, idSchool?: number, schoolName?: string) {
const queryParams = new HttpParams({
   fromObject: {
      year: year + "",
      idSchool: idSchool + "",
      schoolName: schoolName + "",
  }
});
   return this.http.get("@/api/school/term/list", {params: queryParams});
}
/**
 * @api {post} @/api/school/term/
 * @apiName save
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0, 50
*/
save(entity: TermsModel) {
   return this.http.post("@/api/school/term/", entity);
}
/**
 * @api {put} @/api/school/term/:id
 * @apiName update
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0, 50
*/
update(id: number, entity: TermsModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/school/term/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/school/term/:idTerm
 * @apiName delete
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0
*/
delete(idTerm: number) {
const pathParams = {
      idTerm: idTerm,
};
   return this.http.delete("@/api/school/term/${pathParams.idTerm}");
}
}


 class ApiSubjectRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/subject/list
 * @apiName list
 * @apiGroup ApiSubjectController
*/
list() {
   return this.http.get("@/api/subject/list");
}
}


 class ApiUsersRest {
constructor(private http: HttpClient) {}
/**
 * @api {post} #/api/user/auth
 * @apiName usersAuth
 * @apiGroup ApiUsersController
*/
usersAuth(entity: string) {
   return this.http.post("#/api/user/auth", entity);
}
/**
 * @api {get} @/api/user/logout
 * @apiName logout
 * @apiGroup ApiUsersController
*/
logout() {
   return this.http.get("@/api/user/logout");
}
/**
 * @api {get} @/api/user/list
 * @apiName list
 * @apiGroup ApiUsersController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
list(idSchool?: number, filter?: string, offspring?: number) {
const queryParams = new HttpParams({
   fromObject: {
      idSchool: idSchool + "",
      filter: filter + "",
      offspring: offspring + "",
  }
});
   return this.http.get("@/api/user/list", {params: queryParams});
}
/**
 * @api {post} @/api/user/
 * @apiName save
 * @apiGroup ApiUsersController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: UserModel) {
   return this.http.post("@/api/user/", entity);
}
/**
 * @api {post} @/api/user/import
 * @apiName importUsers
 * @apiGroup ApiUsersController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
importUsers(entity: any) {
   return this.http.post("@/api/user/import", entity);
}
/**
 * @api {delete} @/api/user/:idUser
 * @apiName delete
 * @apiGroup ApiUsersController
 * @apiPermission Accepted roles 0, 50
*/
delete(idUser: number) {
const pathParams = {
      idUser: idUser,
};
   return this.http.delete("@/api/user/${pathParams.idUser}");
}
}


 class AdminRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/admin/
 * @apiName adminHomePage
 * @apiGroup AdminController
*/
adminHomePage() {
   return this.http.get("@/admin/");
}
}


 class AdminTasksRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/classroom/admin/groups
 * @apiName adminGroups
 * @apiGroup AdminTasksController
*/
adminGroups() {
   return this.http.get("@/classroom/admin/groups");
}
}


 class ClassroomRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/classroom/
 * @apiName desktopPage
 * @apiGroup ClassroomController
*/
desktopPage() {
   return this.http.get("@/classroom/");
}
}


 class ApiActivityRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/activity/search
 * @apiName search
 * @apiGroup ApiActivityController
*/
search(text?: string, limit?: number, offset?: number) {
const queryParams = new HttpParams({
   fromObject: {
      text: text + "",
      limit: limit + "",
      offset: offset + "",
  }
});
   return this.http.get("@/api/activity/search", {params: queryParams});
}
/**
 * @api {post} @/api/activity/
 * @apiName save
 * @apiGroup ApiActivityController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: ActivityModel) {
   return this.http.post("@/api/activity/", entity);
}
/**
 * @api {put} @/api/activity/:id
 * @apiName update
 * @apiGroup ApiActivityController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: ActivityModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/activity/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/activity/:idActivity
 * @apiName delete
 * @apiGroup ApiActivityController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idActivity: number) {
const pathParams = {
      idActivity: idActivity,
};
   return this.http.delete("@/api/activity/${pathParams.idActivity}");
}
}


 class ApiBadgesRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/badges/list
 * @apiName list
 * @apiGroup ApiBadgesController
*/
list(idGroup?: number, idUser?: number, fromType?: number, toType?: number, fromDate?: Object, toDate?: Object) {
const queryParams = new HttpParams({
   fromObject: {
      idGroup: idGroup + "",
      idUser: idUser + "",
      fromType: fromType + "",
      toType: toType + "",
      fromDate: fromDate + "",
      toDate: toDate + "",
  }
});
   return this.http.get("@/api/badges/list", {params: queryParams});
}
/**
 * @api {post} @/api/badges/
 * @apiName save
 * @apiGroup ApiBadgesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: BadgesModel) {
   return this.http.post("@/api/badges/", entity);
}
/**
 * @api {put} @/api/badges/:id
 * @apiName update
 * @apiGroup ApiBadgesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: BadgesModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/badges/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/badges/:idBadge
 * @apiName delete
 * @apiGroup ApiBadgesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idBadge: number) {
const pathParams = {
      idBadge: idBadge,
};
   return this.http.delete("@/api/badges/${pathParams.idBadge}");
}
}


 class ApiChallengesRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/challenges/list
 * @apiName list
 * @apiGroup ApiChallengesController
*/
list(level?: string, day?: Object, idUser?: number) {
const queryParams = new HttpParams({
   fromObject: {
      level: level + "",
      day: day + "",
      idUser: idUser + "",
  }
});
   return this.http.get("@/api/challenges/list", {params: queryParams});
}
/**
 * @api {post} @/api/challenges/
 * @apiName save
 * @apiGroup ApiChallengesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: ChallengesModel) {
   return this.http.post("@/api/challenges/", entity);
}
/**
 * @api {put} @/api/challenges/:id
 * @apiName update
 * @apiGroup ApiChallengesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: ChallengesModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/challenges/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/challenges/:idChallenge
 * @apiName delete
 * @apiGroup ApiChallengesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idChallenge: number) {
const pathParams = {
      idChallenge: idChallenge,
};
   return this.http.delete("@/api/challenges/${pathParams.idChallenge}");
}
}


 class ApiCourseRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/course/:id
 * @apiName get
 * @apiGroup ApiCourseController
*/
get(id: number) {
const pathParams = {
      id: id,
};
   return this.http.get("@/api/course/${pathParams.id}");
}
/**
 * @api {get} @/api/course/list/:idUser
 * @apiName list
 * @apiGroup ApiCourseController
*/
list(idUser: number, created?: boolean) {
const queryParams = new HttpParams({
   fromObject: {
      created: created + "",
  }
});
const pathParams = {
      idUser: idUser,
};
   return this.http.get("@/api/course/list/${pathParams.idUser}", {params: queryParams});
}
/**
 * @api {post} @/api/course/
 * @apiName save
 * @apiGroup ApiCourseController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: CourseModel) {
   return this.http.post("@/api/course/", entity);
}
/**
 * @api {put} @/api/course/:id
 * @apiName update
 * @apiGroup ApiCourseController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: CourseModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/course/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/course/:id
 * @apiName delete
 * @apiGroup ApiCourseController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(id: number) {
const pathParams = {
      id: id,
};
   return this.http.delete("@/api/course/${pathParams.id}");
}
}


 class ApiGroupsRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/group/list
 * @apiName list
 * @apiGroup ApiGroupsController
*/
list(idCourse: number, idCreator?: number) {
const queryParams = new HttpParams({
   fromObject: {
      idCourse: idCourse + "",
      idCreator: idCreator + "",
  }
});
   return this.http.get("@/api/group/list", {params: queryParams});
}
/**
 * @api {get} @/api/group/:idGroup
 * @apiName get
 * @apiGroup ApiGroupsController
*/
get(idGroup: number) {
const pathParams = {
      idGroup: idGroup,
};
   return this.http.get("@/api/group/${pathParams.idGroup}");
}
/**
 * @api {post} @/api/group/
 * @apiName save
 * @apiGroup ApiGroupsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: GroupsModel) {
   return this.http.post("@/api/group/", entity);
}
/**
 * @api {put} @/api/group/:id
 * @apiName update
 * @apiGroup ApiGroupsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: GroupsModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/group/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/group/:idGroup
 * @apiName delete
 * @apiGroup ApiGroupsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idGroup: number) {
const pathParams = {
      idGroup: idGroup,
};
   return this.http.delete("@/api/group/${pathParams.idGroup}");
}
}


 class ApiSectionRest {
constructor(private http: HttpClient) {}
/**
 * @api {post} @/api/section/
 * @apiName save
 * @apiGroup ApiSectionController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: SectionModel) {
   return this.http.post("@/api/section/", entity);
}
/**
 * @api {put} @/api/section/:id
 * @apiName update
 * @apiGroup ApiSectionController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: Object, entity: SectionModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/section/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/section/:idSection
 * @apiName delete
 * @apiGroup ApiSectionController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idSection: number) {
const pathParams = {
      idSection: idSection,
};
   return this.http.delete("@/api/section/${pathParams.idSection}");
}
}


 class ApiUnitsRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/units/assigned/:idCourse
 * @apiName listAssigned
 * @apiGroup ApiUnitsController
*/
listAssigned(idCourse: number, idUser?: number) {
const queryParams = new HttpParams({
   fromObject: {
      idUser: idUser + "",
  }
});
const pathParams = {
      idCourse: idCourse,
};
   return this.http.get("@/api/units/assigned/${pathParams.idCourse}", {params: queryParams});
}
/**
 * @api {get} @/api/units/created/:idCourse
 * @apiName listCreated
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
listCreated(idCourse: number) {
const pathParams = {
      idCourse: idCourse,
};
   return this.http.get("@/api/units/created/${pathParams.idCourse}");
}
/**
 * @api {get} @/api/units/list/:idCourse
 * @apiName listUnitsOnly
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
listUnitsOnly(idCourse: number) {
const pathParams = {
      idCourse: idCourse,
};
   return this.http.get("@/api/units/list/${pathParams.idCourse}");
}
/**
 * @api {post} @/api/units/
 * @apiName save
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: UnitModel) {
   return this.http.post("@/api/units/", entity);
}
/**
 * @api {put} @/api/units/
 * @apiName saveOrdering
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
saveOrdering(entity: any) {
   return this.http.put("@/api/units/", entity);
}
/**
 * @api {put} @/api/units/:id
 * @apiName update
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: UnitModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/units/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/units/:idUnit
 * @apiName delete
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idUnit: number) {
const pathParams = {
      idUnit: idUnit,
};
   return this.http.delete("@/api/units/${pathParams.idUnit}");
}
}
