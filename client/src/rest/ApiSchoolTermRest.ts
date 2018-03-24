import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { TermsModel } from '../entities/TermsModel'

@Injectable()
export class ApiSchoolTermRest { 
constructor(private http: HttpClient) {
}
/**
 * @api {get} @/api/school/term/
 * @apiName get
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0
*/
get(idTerm?: number) {
   const queryParams = new HttpParams({
   fromObject: {
      idTerm: idTerm + "",
     }
   });
   const url = `@/api/school/term/`
   return this.http.get(url, {params: queryParams});
}

/**
 * @api {get} @/api/school/term/list
 * @apiName list
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0, 50
*/
list(year: number, idSchool?: number, schoolName?: string) {
   const queryParams = new HttpParams({
   fromObject: {
      year: year + "",
      idSchool: idSchool + "",
      schoolName: schoolName + "",
     }
   });
   const url = `@/api/school/term/list`
   return this.http.get(url, {params: queryParams});
}

/**
 * @api {post} @/api/school/term/
 * @apiName save
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0, 50
*/
save(entity: TermsModel) {
   const url = `@/api/school/term/`
   return this.http.post(url, entity);
}

/**
 * @api {put} @/api/school/term/:id
 * @apiName update
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0, 50
*/
update(id: number, entity: TermsModel) {
   const pathParams = {
      id: id,
   };
   const url = `@/api/school/term/${pathParams.id}`
   return this.http.put(url, entity);
}

/**
 * @api {delete} @/api/school/term/:idTerm
 * @apiName delete
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0
*/
delete(idTerm: number) {
   const pathParams = {
      idTerm: idTerm,
   };
   const url = `@/api/school/term/${pathParams.idTerm}`
   return this.http.delete(url);
}

}
