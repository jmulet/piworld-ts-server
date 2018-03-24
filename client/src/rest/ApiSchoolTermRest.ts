import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TermsModel } from "../entities/TermsModel" 


@Injectable()
export  class ApiSchoolTermRest {
constructor(private http: HttpClient) {}
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
   return this.http.get("@/api/school/term/", {params: queryParams});
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
   return this.http.get("@/api/school/term/list", {params: queryParams});
}
/**
 * @api {post} @/api/school/term/
 * @apiName save
 * @apiGroup ApiSchoolTermController
 * @apiPermission Accepted roles 0, 50
*/
save(entity: TermsModel) {
   return this.http.post("@/api/school/term/", entity);
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
   return this.http.put("@/api/school/term/${pathParams.id}", entity);
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
   return this.http.delete("@/api/school/term/${pathParams.idTerm}");
}
}
