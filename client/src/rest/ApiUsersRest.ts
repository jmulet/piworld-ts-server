import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from "../entities/UserModel" 


@Injectable()
export  class ApiUsersRest {
constructor(private http: HttpClient) {}
/**
 * @api {post} #/api/user/auth
 * @apiName usersAuth
 * @apiGroup ApiUsersController
*/
usersAuth(entity: string) {
   return this.http.post("#/api/user/auth", entity);
}
/**
 * @api {get} @/api/user/logout
 * @apiName logout
 * @apiGroup ApiUsersController
*/
logout() {
   return this.http.get("@/api/user/logout");
}
/**
 * @api {get} @/api/user/list
 * @apiName list
 * @apiGroup ApiUsersController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
list(idSchool?: number, filter?: string, offspring?: number) {
const queryParams = new HttpParams({
   fromObject: {
      idSchool: idSchool + "",
      filter: filter + "",
      offspring: offspring + "",
  }
});
   return this.http.get("@/api/user/list", {params: queryParams});
}
/**
 * @api {post} @/api/user/
 * @apiName save
 * @apiGroup ApiUsersController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity: UserModel) {
   return this.http.post("@/api/user/", entity);
}
/**
 * @api {post} @/api/user/import
 * @apiName importUsers
 * @apiGroup ApiUsersController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
importUsers(entity: any) {
   return this.http.post("@/api/user/import", entity);
}
/**
 * @api {delete} @/api/user/:idUser
 * @apiName delete
 * @apiGroup ApiUsersController
 * @apiPermission Accepted roles 0, 50
*/
delete(idUser: number) {
const pathParams = {
      idUser: idUser,
};
   return this.http.delete("@/api/user/${pathParams.idUser}");
}
}
