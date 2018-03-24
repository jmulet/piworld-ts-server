import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export  class DesktopRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/desktop.htm
 * @apiName desktopPage
 * @apiGroup DesktopController
*/
desktopPage() {
   return this.http.get("@/desktop.htm");
}
}
