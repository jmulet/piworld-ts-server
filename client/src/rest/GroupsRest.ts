import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupsModel } from "../entities/GroupsModel" 


@Injectable()
export  class GroupsRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/group/list
 * @apiName list
 * @apiGroup GroupsController
*/
list(idCourse?: number, idCreator?: number) {
const queryParams = new HttpParams({
   fromObject: {
      idCourse: idCourse + "",
      idCreator: idCreator + "",
  }
});
   return this.http.get("@/api/group/list", {params: queryParams});
}
/**
 * @api {get} @/api/group/:idGroup
 * @apiName get
 * @apiGroup GroupsController
*/
get(idGroup: number) {
const pathParams = {
      idGroup: idGroup,
};
   return this.http.get("@/api/group/${pathParams.idGroup}");
}
/**
 * @api {post} @/api/group/
 * @apiName save
 * @apiGroup GroupsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity?: GroupsModel) {
   return this.http.post("@/api/group/", entity);
}
/**
 * @api {put} @/api/group/:id
 * @apiName update
 * @apiGroup GroupsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity?: GroupsModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/group/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/group/:idGroup
 * @apiName del
 * @apiGroup GroupsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
del(idGroup: number) {
const pathParams = {
      idGroup: idGroup,
};
   return this.http.delete("@/api/group/${pathParams.idGroup}");
}
}
