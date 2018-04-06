import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HolidayModel } from '../entities/HolidayModel';

@Injectable()
export class ApiSchoolHolidayRest { 
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
