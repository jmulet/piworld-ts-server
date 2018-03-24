import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchoolModel } from "../entities/SchoolModel" 


@Injectable()
export  class ApiSchoolRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/school/list
 * @apiName list
 * @apiGroup ApiSchoolController
 * @apiPermission Accepted roles 0, 50
*/
list(idSchool?: number) {
const queryParams = new HttpParams({
   fromObject: {
      idSchool: idSchool + "",
  }
});
   return this.http.get("@/api/school/list", {params: queryParams});
}
/**
 * @api {post} @/api/school/
 * @apiName save
 * @apiGroup ApiSchoolController
 * @apiPermission Accepted roles 0, 50
*/
save(entity: SchoolModel) {
   return this.http.post("@/api/school/", entity);
}
/**
 * @api {put} @/api/school/:id
 * @apiName update
 * @apiGroup ApiSchoolController
 * @apiPermission Accepted roles 0, 50
*/
update(id: number, entity: SchoolModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/school/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/school/:idSchool
 * @apiName delete
 * @apiGroup ApiSchoolController
 * @apiPermission Accepted roles 0
*/
delete(idSchool: number) {
const pathParams = {
      idSchool: idSchool,
};
   return this.http.delete("@/api/school/${pathParams.idSchool}");
}
}
