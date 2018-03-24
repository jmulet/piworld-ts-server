import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HolidayModel } from "../entities/HolidayModel" 


@Injectable()
export  class ApiSchoolHolidayRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/school/holiday/:idHoliday
 * @apiName get
 * @apiGroup ApiSchoolHolidayController
 * @apiPermission Accepted roles 0
*/
get(idHoliday: number) {
const pathParams = {
      idHoliday: idHoliday,
};
   return this.http.get("@/api/school/holiday/${pathParams.idHoliday}");
}
/**
 * @api {get} @/api/school/holiday/list
 * @apiName list
 * @apiGroup ApiSchoolHolidayController
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
   return this.http.get("@/api/school/holiday/list", {params: queryParams});
}
/**
 * @api {post} @/api/school/holiday/
 * @apiName save
 * @apiGroup ApiSchoolHolidayController
*/
save(entity: HolidayModel) {
   return this.http.post("@/api/school/holiday/", entity);
}
/**
 * @api {put} @/api/school/holiday/:id
 * @apiName update
 * @apiGroup ApiSchoolHolidayController
 * @apiPermission Accepted roles 0, 50
*/
update(id: number, entity: HolidayModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/school/holiday/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/school/holiday/:idHoliday
 * @apiName delete
 * @apiGroup ApiSchoolHolidayController
 * @apiPermission Accepted roles 0
*/
delete(idHoliday: number) {
const pathParams = {
      idHoliday: idHoliday,
};
   return this.http.delete("@/api/school/holiday/${pathParams.idHoliday}");
}
}
