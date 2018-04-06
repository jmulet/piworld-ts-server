import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitModel } from '../entities/UnitModel';

@Injectable()
export class ApiUnitsRest { 
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
