import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitModel } from "../entities/UnitModel" 


@Injectable()
export  class ApiUnitsRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/units/assigned/:idCourse
 * @apiName listAssigned
 * @apiGroup ApiUnitsController
*/
listAssigned(idCourse: number, idUser?: number) {
const queryParams = new HttpParams({
   fromObject: {
      idUser: idUser + "",
  }
});
const pathParams = {
      idCourse: idCourse,
};
   return this.http.get("@/api/units/assigned/${pathParams.idCourse}", {params: queryParams});
}
/**
 * @api {get} @/api/units/created/:idCourse
 * @apiName listCreated
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
listCreated(idCourse: number) {
const pathParams = {
      idCourse: idCourse,
};
   return this.http.get("@/api/units/created/${pathParams.idCourse}");
}
/**
 * @api {get} @/api/units/list/:idCourse
 * @apiName listUnitsOnly
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
listUnitsOnly(idCourse: number) {
const pathParams = {
      idCourse: idCourse,
};
   return this.http.get("@/api/units/list/${pathParams.idCourse}");
}
/**
 * @api {post} @/api/units/
 * @apiName save
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: UnitModel) {
   return this.http.post("@/api/units/", entity);
}
/**
 * @api {put} @/api/units/
 * @apiName saveOrdering
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
saveOrdering(entity: any) {
   return this.http.put("@/api/units/", entity);
}
/**
 * @api {put} @/api/units/:id
 * @apiName update
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity: UnitModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/units/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/units/:idUnit
 * @apiName delete
 * @apiGroup ApiUnitsController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
delete(idUnit: number) {
const pathParams = {
      idUnit: idUnit,
};
   return this.http.delete("@/api/units/${pathParams.idUnit}");
}
}
