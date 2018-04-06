import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityModel } from '../entities/ActivityModel';

@Injectable()
export class ApiActivityRest { 
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
