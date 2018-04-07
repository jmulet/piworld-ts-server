import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LevelsModel } from '../entities/LevelsModel';

@Injectable()
export class ApiLevelsRest { 
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
