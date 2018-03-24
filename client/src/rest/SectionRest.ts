import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SectionModel } from "../entities/SectionModel" 


@Injectable()
export  class SectionRest {
constructor(private http: HttpClient) {}
/**
 * @api {post} @/api/section/
 * @apiName save
 * @apiGroup SectionController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity?: SectionModel) {
   return this.http.post("@/api/section/", entity);
}
/**
 * @api {put} @/api/section/:id
 * @apiName update
 * @apiGroup SectionController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: Object, entity?: SectionModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/section/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/section/:idSection
 * @apiName del
 * @apiGroup SectionController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
del(idSection: number) {
const pathParams = {
      idSection: idSection,
};
   return this.http.delete("@/api/section/${pathParams.idSection}");
}
}
