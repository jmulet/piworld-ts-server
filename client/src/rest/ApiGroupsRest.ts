import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupsModel } from '../entities/GroupsModel';

@Injectable()
export class ApiGroupsRest { 
   constructor(private http: HttpClient) {
   }
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
         const url = `@/api/group/list`
         return this.http.get(url, {params: queryParams});
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
         const pathParams = {
            id: id,
         };
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
         const pathParams = {
            idGroup: idGroup,
         };
         const url = `@/api/group/${pathParams.idGroup}`
         return this.http.delete(url);
   }
}
