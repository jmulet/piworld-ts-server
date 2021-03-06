import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SectionModel } from '../entities/SectionModel';

@Injectable()
export class ApiSectionRest { 
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
