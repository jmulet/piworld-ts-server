import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BadgesModel } from "../entities/BadgesModel" 


@Injectable()
export  class ApiBadgesRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/badges/list
 * @apiName list
 * @apiGroup ApiBadgesController
*/
list(idGroup?: number, idUser?: number, fromType?: number, toType?: number, fromDate?: Object, toDate?: Object) {
const queryParams = new HttpParams({
   fromObject: {
      idGroup: idGroup + "",
      idUser: idUser + "",
      fromType: fromType + "",
      toType: toType + "",
      fromDate: fromDate + "",
      toDate: toDate + "",
  }
});
   return this.http.get("@/api/badges/list", {params: queryParams});
}
/**
 * @api {post} @/api/badges/
 * @apiName save
 * @apiGroup ApiBadgesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: BadgesModel) {
   return this.http.post("@/api/badges/", entity);
}
/**
 * @api {put} @/api/badges/:id
 * @apiName update
 * @apiGroup ApiBadgesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: BadgesModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/badges/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/badges/:idBadge
 * @apiName delete
 * @apiGroup ApiBadgesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idBadge: number) {
const pathParams = {
      idBadge: idBadge,
};
   return this.http.delete("@/api/badges/${pathParams.idBadge}");
}
}
