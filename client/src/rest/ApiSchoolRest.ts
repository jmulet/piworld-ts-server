import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchoolModel } from '../entities/SchoolModel';

@Injectable()
export class ApiSchoolRest { 
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
