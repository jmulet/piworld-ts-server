import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FamousEqnModel } from '../entities/FamousEqnModel';
import { FamousQuoteModel } from '../entities/FamousQuoteModel';
import { LevelsModel } from '../entities/LevelsModel';
import { NewsModel } from '../entities/NewsModel';
import { RoleModel } from '../entities/RoleModel';
import { SchoolModel } from '../entities/SchoolModel';
import { HolidayModel } from '../entities/HolidayModel';
import { TermsModel } from '../entities/TermsModel';
import { SubjectCategoryModel } from '../entities/SubjectCategoryModel';
import { SubjectModel } from '../entities/SubjectModel';
import { UserModel } from '../entities/UserModel';
import { ActivityModel } from '../entities/ActivityModel';
import { BadgesModel } from '../entities/BadgesModel';
import { ChallengesModel } from '../entities/ChallengesModel';
import { ChallengesQuizzModel } from '../entities/ChallengesQuizzModel';
import { CourseModel } from '../entities/CourseModel';
import { GroupsModel } from '../entities/GroupsModel';
import { SectionModel } from '../entities/SectionModel';
import { UnitModel } from '../entities/UnitModel';

@Injectable()
export class RestApi { 
   Desktop: DesktopRest;
   Login: LoginRest;
   ApiFamous: ApiFamousRest;
   ApiLevels: ApiLevelsRest;
   ApiNews: ApiNewsRest;
   ApiRoles: ApiRolesRest;
   ApiSchool: ApiSchoolRest;
   ApiSchoolHoliday: ApiSchoolHolidayRest;
   ApiSchoolTerm: ApiSchoolTermRest;
   ApiSubjectCategory: ApiSubjectCategoryRest;
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
   Filemanager: FilemanagerRest;
   ApiFilemanager: ApiFilemanagerRest;
   constructor(private http: HttpClient) {
        this.Desktop = new DesktopRest(http);
        this.Login = new LoginRest(http);
        this.ApiFamous = new ApiFamousRest(http);
        this.ApiLevels = new ApiLevelsRest(http);
        this.ApiNews = new ApiNewsRest(http);
        this.ApiRoles = new ApiRolesRest(http);
        this.ApiSchool = new ApiSchoolRest(http);
        this.ApiSchoolHoliday = new ApiSchoolHolidayRest(http);
        this.ApiSchoolTerm = new ApiSchoolTermRest(http);
        this.ApiSubjectCategory = new ApiSubjectCategoryRest(http);
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
        this.Filemanager = new FilemanagerRest(http);
        this.ApiFilemanager = new ApiFilemanagerRest(http);
   }
}
class DesktopRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/desktop.htm
    * @apiName desktopPage
    * @apiGroup DesktopController
   */
   desktopPage() {
         const url = `@/desktop.htm`
         return this.http.get(url);
   }
}
class LoginRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/
    * @apiName indexPage
    * @apiGroup LoginController
   */
   indexPage() {
         const url = `@/`
         return this.http.get(url);
   }
   /**
    * @api {get} @/login.htm
    * @apiName loginPage
    * @apiGroup LoginController
   */
   loginPage(logout?: Object) {
         const queryParamsObj: any = {};
          if (logout!=null) {
               queryParamsObj.logout = logout + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/login.htm`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} #/login.htm
    * @apiName login
    * @apiGroup LoginController
   */
   login(entity: any) {
         const url = `#/login.htm`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/logout
    * @apiName logout
    * @apiGroup LoginController
   */
   logout() {
         const url = `@/logout`
         return this.http.post(url, {});
   }
   /**
    * @api {get} @/changepwd.htm
    * @apiName changePwdPage
    * @apiGroup LoginController
   */
   changePwdPage(error?: number) {
         const queryParamsObj: any = {};
          if (error!=null) {
               queryParamsObj.error = error + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/changepwd.htm`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/changepwd.htm
    * @apiName changePwd
    * @apiGroup LoginController
   */
   changePwd(entity: any) {
         const url = `@/changepwd.htm`
         return this.http.post(url, entity);
   }
   /**
    * @api {get} @/translate
    * @apiName getTranslations
    * @apiGroup LoginController
   */
   getTranslations(file: string, lang?: string) {
         const queryParamsObj: any = {};
          if (file!=null) {
               queryParamsObj.file = file + "";
          }
          if (lang!=null) {
               queryParamsObj.lang = lang + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/translate`
         return this.http.get(url, {params: queryParams});
   }
}
class ApiFamousRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/famous/:type/list
    * @apiName list
    * @apiGroup ApiFamousController
   */
   list(type: string) {
         const pathParams: any = {};
          if (type!=null) {
               pathParams.type = type + "";
          }
         const url = `@/api/famous/${pathParams.type}/list`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/famous/:type/get/:id
    * @apiName get
    * @apiGroup ApiFamousController
   */
   get(type: string, id: number) {
         const pathParams: any = {};
          if (type!=null) {
               pathParams.type = type + "";
          }
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/famous/${pathParams.type}/get/${pathParams.id}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/famous/equation
    * @apiName saveEquation
    * @apiGroup ApiFamousController
   */
   saveEquation(entity: FamousEqnModel) {
         const url = `@/api/famous/equation`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/api/famous/quote
    * @apiName saveQuote
    * @apiGroup ApiFamousController
   */
   saveQuote(entity: FamousQuoteModel) {
         const url = `@/api/famous/quote`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/api/famous/:type/import
    * @apiName massiveImport
    * @apiGroup ApiFamousController
   */
   massiveImport(type: string, entity: any) {
         const pathParams: any = {};
          if (type!=null) {
               pathParams.type = type + "";
          }
         const url = `@/api/famous/${pathParams.type}/import`
         return this.http.post(url, entity);
   }
   /**
    * @api {delete} @/api/famous/:type/:id
    * @apiName delete
    * @apiGroup ApiFamousController
   */
   delete(type: string, id: number) {
         const pathParams: any = {};
          if (type!=null) {
               pathParams.type = type + "";
          }
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/famous/${pathParams.type}/${pathParams.id}`
         return this.http.delete(url);
   }
}
class ApiLevelsRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/levels/get/:idLevel
    * @apiName get
    * @apiGroup ApiLevelsController
   */
   get(idLevel: number) {
         const pathParams: any = {};
          if (idLevel!=null) {
               pathParams.idLevel = idLevel + "";
          }
         const url = `@/api/levels/get/${pathParams.idLevel}`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/levels/list
    * @apiName list
    * @apiGroup ApiLevelsController
   */
   list(level?: number, studies?: string) {
         const queryParamsObj: any = {};
          if (level!=null) {
               queryParamsObj.level = level + "";
          }
          if (studies!=null) {
               queryParamsObj.studies = studies + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/levels/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/levels/
    * @apiName save
    * @apiGroup ApiLevelsController
   */
   save(entity: LevelsModel) {
         const url = `@/api/levels/`
         return this.http.post(url, entity);
   }
   /**
    * @api {delete} @/api/levels/:idLevel
    * @apiName delete
    * @apiGroup ApiLevelsController
   */
   delete(idLevel: number) {
         const pathParams: any = {};
          if (idLevel!=null) {
               pathParams.idLevel = idLevel + "";
          }
         const url = `@/api/levels/${pathParams.idLevel}`
         return this.http.delete(url);
   }
}
class ApiNewsRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/news/list
    * @apiName list
    * @apiGroup ApiNewsController
   */
   list(limit?: number) {
         const queryParamsObj: any = {};
          if (limit!=null) {
               queryParamsObj.limit = limit + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/news/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/news/:idNews
    * @apiName get
    * @apiGroup ApiNewsController
   */
   get(idNews: number) {
         const pathParams: any = {};
          if (idNews!=null) {
               pathParams.idNews = idNews + "";
          }
         const url = `@/api/news/${pathParams.idNews}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/news/
    * @apiName save
    * @apiGroup ApiNewsController
   */
   save(entity?: NewsModel) {
         const url = `@/api/news/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/news/:idNews
    * @apiName update
    * @apiGroup ApiNewsController
   */
   update(idNews: number, entity?: NewsModel) {
         const pathParams: any = {};
          if (idNews!=null) {
               pathParams.idNews = idNews + "";
          }
         const url = `@/api/news/${pathParams.idNews}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/news/:idNews
    * @apiName delete
    * @apiGroup ApiNewsController
   */
   delete(idNews: number) {
         const pathParams: any = {};
          if (idNews!=null) {
               pathParams.idNews = idNews + "";
          }
         const url = `@/api/news/${pathParams.idNews}`
         return this.http.delete(url);
   }
   /**
    * @api {post} @/api/news/ordering
    * @apiName saveOrdering
    * @apiGroup ApiNewsController
   */
   saveOrdering(entity?: any) {
         const url = `@/api/news/ordering`
         return this.http.post(url, entity);
   }
}
class ApiRolesRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/roles/r/list
    * @apiName listRoles
    * @apiGroup ApiRolesController
   */
   listRoles(slim?: boolean, idUserCreator?: number) {
         const queryParamsObj: any = {};
          if (slim!=null) {
               queryParamsObj.slim = slim + "";
          }
          if (idUserCreator!=null) {
               queryParamsObj.idUserCreator = idUserCreator + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/roles/r/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/roles/r/
    * @apiName getRole
    * @apiGroup ApiRolesController
   */
   getRole(slim?: boolean, id?: number, string?: string) {
         const queryParamsObj: any = {};
          if (slim!=null) {
               queryParamsObj.slim = slim + "";
          }
          if (id!=null) {
               queryParamsObj.id = id + "";
          }
          if (string!=null) {
               queryParamsObj.string = string + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/roles/r/`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/roles/r/
    * @apiName saveRole
    * @apiGroup ApiRolesController
   */
   saveRole(entity: RoleModel) {
         const url = `@/api/roles/r/`
         return this.http.post(url, entity);
   }
   /**
    * @api {delete} @/api/roles/r/
    * @apiName deleteRole
    * @apiGroup ApiRolesController
   */
   deleteRole(id?: number, string?: string) {
         const queryParamsObj: any = {};
          if (id!=null) {
               queryParamsObj.id = id + "";
          }
          if (string!=null) {
               queryParamsObj.string = string + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/roles/r/`
         return this.http.delete(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/roles/c/list
    * @apiName listCapabilities
    * @apiGroup ApiRolesController
   */
   listCapabilities(appName?: string) {
         const queryParamsObj: any = {};
          if (appName!=null) {
               queryParamsObj.appName = appName + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/roles/c/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/roles/c/:id
    * @apiName getCapability
    * @apiGroup ApiRolesController
   */
   getCapability(id: number) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/roles/c/${pathParams.id}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/roles/c/
    * @apiName saveCapability
    * @apiGroup ApiRolesController
   */
   saveCapability(entity: any) {
         const url = `@/api/roles/c/`
         return this.http.post(url, entity);
   }
   /**
    * @api {delete} @/api/roles/c/:id
    * @apiName deleteCapability
    * @apiGroup ApiRolesController
   */
   deleteCapability(id: number) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/roles/c/${pathParams.id}`
         return this.http.delete(url);
   }
}
class ApiSchoolRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/school/list
    * @apiName list
    * @apiGroup ApiSchoolController
    * @apiPermission Accepted roles 0, 50
   */
   list(idSchool?: number) {
         const queryParamsObj: any = {};
          if (idSchool!=null) {
               queryParamsObj.idSchool = idSchool + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/school/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/school/
    * @apiName save
    * @apiGroup ApiSchoolController
    * @apiPermission Accepted roles 0, 50
   */
   save(entity: SchoolModel) {
         const url = `@/api/school/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/school/:id
    * @apiName update
    * @apiGroup ApiSchoolController
    * @apiPermission Accepted roles 0, 50
   */
   update(id: number, entity: SchoolModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/school/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/school/:idSchool
    * @apiName delete
    * @apiGroup ApiSchoolController
    * @apiPermission Accepted roles 0
   */
   delete(idSchool: number) {
         const pathParams: any = {};
          if (idSchool!=null) {
               pathParams.idSchool = idSchool + "";
          }
         const url = `@/api/school/${pathParams.idSchool}`
         return this.http.delete(url);
   }
}
class ApiSchoolHolidayRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/school/holiday/:idHoliday
    * @apiName get
    * @apiGroup ApiSchoolHolidayController
    * @apiPermission Accepted roles 0
   */
   get(idHoliday: number) {
         const pathParams: any = {};
          if (idHoliday!=null) {
               pathParams.idHoliday = idHoliday + "";
          }
         const url = `@/api/school/holiday/${pathParams.idHoliday}`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/school/holiday/list
    * @apiName list
    * @apiGroup ApiSchoolHolidayController
    * @apiPermission Accepted roles 0, 50
   */
   list(year: number, idSchool?: number, schoolName?: string) {
         const queryParamsObj: any = {};
          if (year!=null) {
               queryParamsObj.year = year + "";
          }
          if (idSchool!=null) {
               queryParamsObj.idSchool = idSchool + "";
          }
          if (schoolName!=null) {
               queryParamsObj.schoolName = schoolName + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/school/holiday/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/school/holiday/
    * @apiName save
    * @apiGroup ApiSchoolHolidayController
   */
   save(entity: HolidayModel) {
         const url = `@/api/school/holiday/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/school/holiday/:id
    * @apiName update
    * @apiGroup ApiSchoolHolidayController
    * @apiPermission Accepted roles 0, 50
   */
   update(id: number, entity: HolidayModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/school/holiday/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/school/holiday/:idHoliday
    * @apiName delete
    * @apiGroup ApiSchoolHolidayController
    * @apiPermission Accepted roles 0
   */
   delete(idHoliday: number) {
         const pathParams: any = {};
          if (idHoliday!=null) {
               pathParams.idHoliday = idHoliday + "";
          }
         const url = `@/api/school/holiday/${pathParams.idHoliday}`
         return this.http.delete(url);
   }
}
class ApiSchoolTermRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/school/term/
    * @apiName get
    * @apiGroup ApiSchoolTermController
    * @apiPermission Accepted roles 0
   */
   get(idTerm?: number) {
         const queryParamsObj: any = {};
          if (idTerm!=null) {
               queryParamsObj.idTerm = idTerm + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/school/term/`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/school/term/list
    * @apiName list
    * @apiGroup ApiSchoolTermController
    * @apiPermission Accepted roles 0, 50
   */
   list(year: number, idSchool?: number, schoolName?: string) {
         const queryParamsObj: any = {};
          if (year!=null) {
               queryParamsObj.year = year + "";
          }
          if (idSchool!=null) {
               queryParamsObj.idSchool = idSchool + "";
          }
          if (schoolName!=null) {
               queryParamsObj.schoolName = schoolName + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/school/term/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/school/term/
    * @apiName save
    * @apiGroup ApiSchoolTermController
    * @apiPermission Accepted roles 0, 50
   */
   save(entity: TermsModel) {
         const url = `@/api/school/term/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/school/term/:id
    * @apiName update
    * @apiGroup ApiSchoolTermController
    * @apiPermission Accepted roles 0, 50
   */
   update(id: number, entity: TermsModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/school/term/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/school/term/:idTerm
    * @apiName delete
    * @apiGroup ApiSchoolTermController
    * @apiPermission Accepted roles 0
   */
   delete(idTerm: number) {
         const pathParams: any = {};
          if (idTerm!=null) {
               pathParams.idTerm = idTerm + "";
          }
         const url = `@/api/school/term/${pathParams.idTerm}`
         return this.http.delete(url);
   }
}
class ApiSubjectCategoryRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/subject/category/list
    * @apiName list
    * @apiGroup ApiSubjectCategoryController
   */
   list() {
         const url = `@/api/subject/category/list`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/subject/category/:id
    * @apiName get
    * @apiGroup ApiSubjectCategoryController
   */
   get(id: number) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/subject/category/${pathParams.id}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/subject/category/
    * @apiName save
    * @apiGroup ApiSubjectCategoryController
   */
   save(entity: SubjectCategoryModel) {
         const url = `@/api/subject/category/`
         return this.http.post(url, entity);
   }
   /**
    * @api {delete} @/api/subject/category/:id
    * @apiName delete
    * @apiGroup ApiSubjectCategoryController
   */
   delete(id: number) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/subject/category/${pathParams.id}`
         return this.http.delete(url);
   }
}
class ApiSubjectRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/subject/list
    * @apiName list
    * @apiGroup ApiSubjectController
   */
   list() {
         const url = `@/api/subject/list`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/subject/:idSubject
    * @apiName get
    * @apiGroup ApiSubjectController
   */
   get(idSubject: number) {
         const pathParams: any = {};
          if (idSubject!=null) {
               pathParams.idSubject = idSubject + "";
          }
         const url = `@/api/subject/${pathParams.idSubject}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/subject/
    * @apiName save
    * @apiGroup ApiSubjectController
   */
   save(entity: SubjectModel) {
         const url = `@/api/subject/`
         return this.http.post(url, entity);
   }
   /**
    * @api {delete} @/api/subject/:idSubject
    * @apiName delete
    * @apiGroup ApiSubjectController
   */
   delete(idSubject: number) {
         const pathParams: any = {};
          if (idSubject!=null) {
               pathParams.idSubject = idSubject + "";
          }
         const url = `@/api/subject/${pathParams.idSubject}`
         return this.http.delete(url);
   }
}
class ApiUsersRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {post} #/api/user/auth
    * @apiName usersAuth
    * @apiGroup ApiUsersController
   */
   usersAuth(entity: string) {
         const url = `#/api/user/auth`
         return this.http.post(url, entity);
   }
   /**
    * @api {get} @/api/user/logout
    * @apiName logout
    * @apiGroup ApiUsersController
   */
   logout() {
         const url = `@/api/user/logout`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/user/list
    * @apiName list
    * @apiGroup ApiUsersController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   list(idSchool?: number, filter?: string, offspring?: number) {
         const queryParamsObj: any = {};
          if (idSchool!=null) {
               queryParamsObj.idSchool = idSchool + "";
          }
          if (filter!=null) {
               queryParamsObj.filter = filter + "";
          }
          if (offspring!=null) {
               queryParamsObj.offspring = offspring + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/user/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/user/
    * @apiName save
    * @apiGroup ApiUsersController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   save(entity: UserModel) {
         const url = `@/api/user/`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/api/user/import
    * @apiName importUsers
    * @apiGroup ApiUsersController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   importUsers(entity: any) {
         const url = `@/api/user/import`
         return this.http.post(url, entity);
   }
   /**
    * @api {delete} @/api/user/:idUser
    * @apiName delete
    * @apiGroup ApiUsersController
    * @apiPermission Accepted roles 0, 50
   */
   delete(idUser: number) {
         const pathParams: any = {};
          if (idUser!=null) {
               pathParams.idUser = idUser + "";
          }
         const url = `@/api/user/${pathParams.idUser}`
         return this.http.delete(url);
   }
}
class AdminRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/admin/
    * @apiName adminHomePage
    * @apiGroup AdminController
   */
   adminHomePage() {
         const url = `@/admin/`
         return this.http.get(url);
   }
}
class AdminTasksRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/classroom/admin/groups
    * @apiName adminGroups
    * @apiGroup AdminTasksController
   */
   adminGroups() {
         const url = `@/classroom/admin/groups`
         return this.http.get(url);
   }
}
class ClassroomRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/classroom/
    * @apiName desktopPage
    * @apiGroup ClassroomController
   */
   desktopPage() {
         const url = `@/classroom/`
         return this.http.get(url);
   }
}
class ApiActivityRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/activity/search
    * @apiName search
    * @apiGroup ApiActivityController
   */
   search(text?: string, limit?: number, offset?: number) {
         const queryParamsObj: any = {};
          if (text!=null) {
               queryParamsObj.text = text + "";
          }
          if (limit!=null) {
               queryParamsObj.limit = limit + "";
          }
          if (offset!=null) {
               queryParamsObj.offset = offset + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/activity/search`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/activity/
    * @apiName save
    * @apiGroup ApiActivityController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   save(entity: ActivityModel) {
         const url = `@/api/activity/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/activity/:id
    * @apiName update
    * @apiGroup ApiActivityController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   update(id: number, entity: ActivityModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/activity/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/activity/:idActivity
    * @apiName delete
    * @apiGroup ApiActivityController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   delete(idActivity: number) {
         const pathParams: any = {};
          if (idActivity!=null) {
               pathParams.idActivity = idActivity + "";
          }
         const url = `@/api/activity/${pathParams.idActivity}`
         return this.http.delete(url);
   }
}
class ApiBadgesRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/badges/list
    * @apiName list
    * @apiGroup ApiBadgesController
   */
   list(idGroup?: number, idUser?: number, fromType?: number, toType?: number, fromDate?: Object, toDate?: Object) {
         const queryParamsObj: any = {};
          if (idGroup!=null) {
               queryParamsObj.idGroup = idGroup + "";
          }
          if (idUser!=null) {
               queryParamsObj.idUser = idUser + "";
          }
          if (fromType!=null) {
               queryParamsObj.fromType = fromType + "";
          }
          if (toType!=null) {
               queryParamsObj.toType = toType + "";
          }
          if (fromDate!=null) {
               queryParamsObj.fromDate = fromDate + "";
          }
          if (toDate!=null) {
               queryParamsObj.toDate = toDate + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/badges/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/badges/
    * @apiName save
    * @apiGroup ApiBadgesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   save(entity: BadgesModel) {
         const url = `@/api/badges/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/badges/:id
    * @apiName update
    * @apiGroup ApiBadgesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   update(id: number, entity: BadgesModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/badges/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/badges/:idBadge
    * @apiName delete
    * @apiGroup ApiBadgesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   delete(idBadge: number) {
         const pathParams: any = {};
          if (idBadge!=null) {
               pathParams.idBadge = idBadge + "";
          }
         const url = `@/api/badges/${pathParams.idBadge}`
         return this.http.delete(url);
   }
}
class ApiChallengesRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/challenges/list
    * @apiName list
    * @apiGroup ApiChallengesController
   */
   list(level?: string, day?: Object, idUser?: number) {
         const queryParamsObj: any = {};
          if (level!=null) {
               queryParamsObj.level = level + "";
          }
          if (day!=null) {
               queryParamsObj.day = day + "";
          }
          if (idUser!=null) {
               queryParamsObj.idUser = idUser + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/challenges/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/challenges/
    * @apiName save
    * @apiGroup ApiChallengesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   save(entity: ChallengesModel) {
         const url = `@/api/challenges/`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/api/challenges/quizz
    * @apiName saveQuizz
    * @apiGroup ApiChallengesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   saveQuizz(entity: ChallengesQuizzModel) {
         const url = `@/api/challenges/quizz`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/challenges/:id
    * @apiName update
    * @apiGroup ApiChallengesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   update(id: number, entity: ChallengesModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/challenges/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/challenges/:idChallenge
    * @apiName delete
    * @apiGroup ApiChallengesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   delete(idChallenge: number) {
         const pathParams: any = {};
          if (idChallenge!=null) {
               pathParams.idChallenge = idChallenge + "";
          }
         const url = `@/api/challenges/${pathParams.idChallenge}`
         return this.http.delete(url);
   }
}
class ApiCourseRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/course/:id
    * @apiName get
    * @apiGroup ApiCourseController
   */
   get(id: number) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/course/${pathParams.id}`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/course/list/:idUser
    * @apiName list
    * @apiGroup ApiCourseController
   */
   list(idUser: number, created?: boolean) {
         const queryParamsObj: any = {};
          if (created!=null) {
               queryParamsObj.created = created + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const pathParams: any = {};
          if (idUser!=null) {
               pathParams.idUser = idUser + "";
          }
         const url = `@/api/course/list/${pathParams.idUser}`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/course/
    * @apiName save
    * @apiGroup ApiCourseController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   save(entity: CourseModel) {
         const url = `@/api/course/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/course/:id
    * @apiName update
    * @apiGroup ApiCourseController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   update(id: number, entity: CourseModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/course/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/course/:id
    * @apiName delete
    * @apiGroup ApiCourseController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   delete(id: number) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/course/${pathParams.id}`
         return this.http.delete(url);
   }
}
class ApiGroupsRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/group/list
    * @apiName list
    * @apiGroup ApiGroupsController
   */
   list(idCourse: number, idCreator?: number) {
         const queryParamsObj: any = {};
          if (idCourse!=null) {
               queryParamsObj.idCourse = idCourse + "";
          }
          if (idCreator!=null) {
               queryParamsObj.idCreator = idCreator + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/group/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/group/:idGroup
    * @apiName get
    * @apiGroup ApiGroupsController
   */
   get(idGroup: number) {
         const pathParams: any = {};
          if (idGroup!=null) {
               pathParams.idGroup = idGroup + "";
          }
         const url = `@/api/group/${pathParams.idGroup}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/group/
    * @apiName save
    * @apiGroup ApiGroupsController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   save(entity: GroupsModel) {
         const url = `@/api/group/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/group/:id
    * @apiName update
    * @apiGroup ApiGroupsController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   update(id: number, entity: GroupsModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/group/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/group/:idGroup
    * @apiName delete
    * @apiGroup ApiGroupsController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   delete(idGroup: number) {
         const pathParams: any = {};
          if (idGroup!=null) {
               pathParams.idGroup = idGroup + "";
          }
         const url = `@/api/group/${pathParams.idGroup}`
         return this.http.delete(url);
   }
}
class ApiSectionRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {post} @/api/section/
    * @apiName save
    * @apiGroup ApiSectionController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   save(entity: SectionModel) {
         const url = `@/api/section/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/section/:id
    * @apiName update
    * @apiGroup ApiSectionController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   update(id: Object, entity: SectionModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/section/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/section/:idSection
    * @apiName delete
    * @apiGroup ApiSectionController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   delete(idSection: number) {
         const pathParams: any = {};
          if (idSection!=null) {
               pathParams.idSection = idSection + "";
          }
         const url = `@/api/section/${pathParams.idSection}`
         return this.http.delete(url);
   }
}
class ApiUnitsRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/units/assigned/:idCourse
    * @apiName listAssigned
    * @apiGroup ApiUnitsController
   */
   listAssigned(idCourse: number, idUser?: number) {
         const queryParamsObj: any = {};
          if (idUser!=null) {
               queryParamsObj.idUser = idUser + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const pathParams: any = {};
          if (idCourse!=null) {
               pathParams.idCourse = idCourse + "";
          }
         const url = `@/api/units/assigned/${pathParams.idCourse}`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/units/created/:idCourse
    * @apiName listCreated
    * @apiGroup ApiUnitsController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   listCreated(idCourse: number) {
         const pathParams: any = {};
          if (idCourse!=null) {
               pathParams.idCourse = idCourse + "";
          }
         const url = `@/api/units/created/${pathParams.idCourse}`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/units/list/:idCourse
    * @apiName listUnitsOnly
    * @apiGroup ApiUnitsController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   listUnitsOnly(idCourse: number) {
         const pathParams: any = {};
          if (idCourse!=null) {
               pathParams.idCourse = idCourse + "";
          }
         const url = `@/api/units/list/${pathParams.idCourse}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/units/
    * @apiName save
    * @apiGroup ApiUnitsController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   save(entity: UnitModel) {
         const url = `@/api/units/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/units/
    * @apiName saveOrdering
    * @apiGroup ApiUnitsController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   saveOrdering(entity: any) {
         const url = `@/api/units/`
         return this.http.put(url, entity);
   }
   /**
    * @api {put} @/api/units/:id
    * @apiName update
    * @apiGroup ApiUnitsController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   update(id: number, entity: UnitModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/units/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/units/:idUnit
    * @apiName delete
    * @apiGroup ApiUnitsController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   delete(idUnit: number) {
         const pathParams: any = {};
          if (idUnit!=null) {
               pathParams.idUnit = idUnit + "";
          }
         const url = `@/api/units/${pathParams.idUnit}`
         return this.http.delete(url);
   }
}
class FilemanagerRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/filemanager.htm
    * @apiName filemanagerPage
    * @apiGroup FilemanagerController
   */
   filemanagerPage() {
         const url = `@/filemanager.htm`
         return this.http.get(url);
   }
}
class ApiFilemanagerRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/filemgr/list
    * @apiName listPath
    * @apiGroup ApiFilemanagerController
   */
   listPath(path: string, recursive?: boolean, dotfiles?: boolean, exts?: string, hidefiles?: boolean) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
          if (recursive!=null) {
               queryParamsObj.recursive = recursive + "";
          }
          if (dotfiles!=null) {
               queryParamsObj.dotfiles = dotfiles + "";
          }
          if (exts!=null) {
               queryParamsObj.exts = exts + "";
          }
          if (hidefiles!=null) {
               queryParamsObj.hidefiles = hidefiles + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/filemgr/
    * @apiName readFile
    * @apiGroup ApiFilemanagerController
   */
   readFile(path: string) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/filemgr/download
    * @apiName download
    * @apiGroup ApiFilemanagerController
   */
   download(path: string, inline?: boolean) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
          if (inline!=null) {
               queryParamsObj.inline = inline + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/download`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/filemgr/acl
    * @apiName getACL
    * @apiGroup ApiFilemanagerController
   */
   getACL(path: string) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/acl`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/filemgr/acl
    * @apiName setACL
    * @apiGroup ApiFilemanagerController
   */
   setACL(path: string, entity?: any) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/acl`
         return this.http.post(url, entity, {params: queryParams});
   }
   /**
    * @api {delete} @/api/filemgr/
    * @apiName deletePath
    * @apiGroup ApiFilemanagerController
   */
   deletePath(path: string) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/`
         return this.http.delete(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/filemgr/
    * @apiName deletePaths
    * @apiGroup ApiFilemanagerController
   */
   deletePaths(entity?: any) {
         const url = `@/api/filemgr/`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/api/filemgr/move
    * @apiName movePath
    * @apiGroup ApiFilemanagerController
   */
   movePath(path: string, path2: string) {
         const url = `@/api/filemgr/move`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/dir
    * @apiName createDir
    * @apiGroup ApiFilemanagerController
   */
   createDir(path: string, dirname: string) {
         const url = `@/api/filemgr/dir`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/ascii
    * @apiName saveAsciiFile
    * @apiGroup ApiFilemanagerController
   */
   saveAsciiFile(path: string, filename: string, text: string) {
         const url = `@/api/filemgr/ascii`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/upload
    * @apiName handleFileUpload
    * @apiGroup ApiFilemanagerController
   */
   handleFileUpload(files?: Array<any>) {
         const url = `@/api/filemgr/upload`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/zip
    * @apiName zipPath
    * @apiGroup ApiFilemanagerController
   */
   zipPath(path?: string) {
         const url = `@/api/filemgr/zip`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/unzip
    * @apiName unzipPath
    * @apiGroup ApiFilemanagerController
   */
   unzipPath(path?: string) {
         const url = `@/api/filemgr/unzip`
         return this.http.post(url, {});
   }
}
