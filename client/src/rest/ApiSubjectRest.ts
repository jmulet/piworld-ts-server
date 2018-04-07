import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectModel } from '../entities/SubjectModel';

@Injectable()
export class ApiSubjectRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/subject/list
    * @apiName list
    * @apiGroup ApiSubjectController
   */
   list() {
         const url = `@/api/subject/list`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/subject/:idSubject
    * @apiName get
    * @apiGroup ApiSubjectController
   */
   get(idSubject: number) {
         const pathParams: any = {};
          if (idSubject!=null) {
               pathParams.idSubject = idSubject + "";
          }
         const url = `@/api/subject/${pathParams.idSubject}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/subject/
    * @apiName save
    * @apiGroup ApiSubjectController
   */
   save(entity: SubjectModel) {
         const url = `@/api/subject/`
         return this.http.post(url, entity);
   }
   /**
    * @api {delete} @/api/subject/:idSubject
    * @apiName delete
    * @apiGroup ApiSubjectController
   */
   delete(idSubject: number) {
         const pathParams: any = {};
          if (idSubject!=null) {
               pathParams.idSubject = idSubject + "";
          }
         const url = `@/api/subject/${pathParams.idSubject}`
         return this.http.delete(url);
   }
}
