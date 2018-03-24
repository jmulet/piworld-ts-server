import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SectionModel } from "../entities/SectionModel" 


@Injectable()
export  class ApiSectionRest {
constructor(private http: HttpClient) {}
/**
 * @api {post} @/api/section/
 * @apiName save
 * @apiGroup ApiSectionController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: SectionModel) {
   return this.http.post("@/api/section/", entity);
}
/**
 * @api {put} @/api/section/:id
 * @apiName update
 * @apiGroup ApiSectionController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: Object, entity: SectionModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/section/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/section/:idSection
 * @apiName delete
 * @apiGroup ApiSectionController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idSection: number) {
const pathParams = {
      idSection: idSection,
};
   return this.http.delete("@/api/section/${pathParams.idSection}");
}
}
