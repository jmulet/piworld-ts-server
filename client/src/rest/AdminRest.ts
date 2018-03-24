import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export  class AdminRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/admin/
 * @apiName adminHomePage
 * @apiGroup AdminController
*/
adminHomePage() {
   return this.http.get("@/admin/");
}
}
