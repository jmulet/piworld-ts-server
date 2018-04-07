import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleModel } from '../entities/RoleModel';

@Injectable()
export class ApiRolesRest { 
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
