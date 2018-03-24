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
   const url = `@/`
   return this.http.get(url);
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
   const url = `@/login.htm`
   return this.http.get(url, {params: queryParams});
}
/**
 * @api {post} #/login.htm
 * @apiName login
 * @apiGroup LoginController
*/
login(entity: any) {
   const url = `#/login.htm`
   return this.http.post(url, entity);
}
/**
 * @api {post} @/logout
 * @apiName logout
 * @apiGroup LoginController
*/
logout() {
   const url = `@/logout`
   return this.http.post(url, {});
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
   const url = `@/changepwd.htm`
   return this.http.get(url, {params: queryParams});
}
/**
 * @api {post} @/changepwd.htm
 * @apiName changePwd
 * @apiGroup LoginController
*/
changePwd(entity: any) {
   const url = `@/changepwd.htm`
   return this.http.post(url, entity);
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
   const url = `@/translate`
   return this.http.get(url, {params: queryParams});
}
}
