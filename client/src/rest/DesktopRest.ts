import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DesktopRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/desktop.htm
    * @apiName desktopPage
    * @apiGroup DesktopController
   */
   desktopPage() {
         const url = `@/desktop.htm`
         return this.http.get(url);
   }
}
