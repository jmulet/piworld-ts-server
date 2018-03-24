import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export  class LoginRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/
 * @apiName indexPage
 * @apiGroup LoginController
*/
indexPage() {
   return this.http.get("@/");
}
/**
 * @api {get} @/login.htm
 * @apiName loginPage
 * @apiGroup LoginController
*/
loginPage(logout?: Object) {
const queryParams = new HttpParams({
   fromObject: {
      logout: logout + "",
  }
});
   return this.http.get("@/login.htm", {params: queryParams});
}
/**
 * @api {post} #/login.htm
 * @apiName login
 * @apiGroup LoginController
*/
login(entity: any) {
   return this.http.post("#/login.htm", entity);
}
/**
 * @api {post} @/logout
 * @apiName logout
 * @apiGroup LoginController
*/
logout() {
   return this.http.post("@/logout", {});
}
/**
 * @api {get} @/changepwd.htm
 * @apiName changePwdPage
 * @apiGroup LoginController
*/
changePwdPage(error?: number) {
const queryParams = new HttpParams({
   fromObject: {
      error: error + "",
  }
});
   return this.http.get("@/changepwd.htm", {params: queryParams});
}
/**
 * @api {post} @/changepwd.htm
 * @apiName changePwd
 * @apiGroup LoginController
*/
changePwd(entity: any) {
   return this.http.post("@/changepwd.htm", entity);
}
/**
 * @api {get} @/translate
 * @apiName getTranslations
 * @apiGroup LoginController
*/
getTranslations(file: string, lang?: string) {
const queryParams = new HttpParams({
   fromObject: {
      file: file + "",
      lang: lang + "",
  }
});
   return this.http.get("@/translate", {params: queryParams});
}
}
