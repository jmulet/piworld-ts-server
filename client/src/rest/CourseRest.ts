import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseModel } from "../entities/CourseModel" 


@Injectable()
export  class CourseRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/course/:id
 * @apiName get
 * @apiGroup CourseController
*/
get(id: number) {
const pathParams = {
      id: id,
};
   return this.http.get("@/api/course/${pathParams.id}");
}
/**
 * @api {get} @/api/course/list/:idUser
 * @apiName list
 * @apiGroup CourseController
*/
list(idUser: number, created?: boolean) {
const queryParams = new HttpParams({
   fromObject: {
      created: created + "",
  }
});
const pathParams = {
      idUser: idUser,
};
   return this.http.get("@/api/course/list/${pathParams.idUser}", {params: queryParams});
}
/**
 * @api {post} @/api/course/
 * @apiName save
 * @apiGroup CourseController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity?: CourseModel) {
   return this.http.post("@/api/course/", entity);
}
/**
 * @api {put} @/api/course/:id
 * @apiName update
 * @apiGroup CourseController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity?: CourseModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/course/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/course/:id
 * @apiName del
 * @apiGroup CourseController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
del(id: number) {
const pathParams = {
      id: id,
};
   return this.http.delete("@/api/course/${pathParams.id}");
}
}
