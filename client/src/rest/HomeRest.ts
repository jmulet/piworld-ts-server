import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/home.htm
    * @apiName homePage
    * @apiGroup HomeController
   */
   homePage() {
         const url = `@/home.htm`
         return this.http.get(url);
   }
   /**
    * @api {get} @/admin.htm
    * @apiName adminPage
    * @apiGroup HomeController
    * @apiPermission Accepted roles 50, 0
   */
   adminPage() {
         const url = `@/admin.htm`
         return this.http.get(url);
   }
}
