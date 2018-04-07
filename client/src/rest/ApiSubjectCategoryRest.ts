import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectCategoryModel } from '../entities/SubjectCategoryModel';

@Injectable()
export class ApiSubjectCategoryRest { 
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
