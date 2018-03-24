import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class AdminTasksRest { 
constructor(private http: HttpClient) {
}
/**
 * @api {get} @/classroom/admin/groups
 * @apiName adminGroups
 * @apiGroup AdminTasksController
*/
adminGroups() {
   const url = `@/classroom/admin/groups`
   return this.http.get(url);
}

}
