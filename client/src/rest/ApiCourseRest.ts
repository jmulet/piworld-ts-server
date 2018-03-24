import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseModel } from "../entities/CourseModel" 


@Injectable()
export  class ApiCourseRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/course/:id
 * @apiName get
 * @apiGroup ApiCourseController
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
 * @apiGroup ApiCourseController
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
 * @apiGroup ApiCourseController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: CourseModel) {
   return this.http.post("@/api/course/", entity);
}
/**
 * @api {put} @/api/course/:id
 * @apiName update
 * @apiGroup ApiCourseController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: CourseModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/course/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/course/:id
 * @apiName delete
 * @apiGroup ApiCourseController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(id: number) {
const pathParams = {
      id: id,
};
   return this.http.delete("@/api/course/${pathParams.id}");
}
}
