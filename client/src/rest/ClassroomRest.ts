import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export  class ClassroomRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/classroom/
 * @apiName desktopPage
 * @apiGroup ClassroomController
*/
desktopPage() {
   const url = `@/classroom/`
   return this.http.get(url);
}
}
