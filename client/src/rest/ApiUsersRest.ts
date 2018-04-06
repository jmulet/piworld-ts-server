import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../entities/UserModel';

@Injectable()
export class ApiUsersRest { 
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
