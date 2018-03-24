import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityModel } from "../entities/ActivityModel" 


@Injectable()
export  class ApiActivityRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/activity/search
 * @apiName search
 * @apiGroup ApiActivityController
*/
search(text?: string, limit?: number, offset?: number) {
const queryParams = new HttpParams({
   fromObject: {
      text: text + "",
      limit: limit + "",
      offset: offset + "",
  }
});
   return this.http.get("@/api/activity/search", {params: queryParams});
}
/**
 * @api {post} @/api/activity/
 * @apiName save
 * @apiGroup ApiActivityController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: ActivityModel) {
   return this.http.post("@/api/activity/", entity);
}
/**
 * @api {put} @/api/activity/:id
 * @apiName update
 * @apiGroup ApiActivityController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: ActivityModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/activity/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/activity/:idActivity
 * @apiName delete
 * @apiGroup ApiActivityController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idActivity: number) {
const pathParams = {
      idActivity: idActivity,
};
   return this.http.delete("@/api/activity/${pathParams.idActivity}");
}
}
