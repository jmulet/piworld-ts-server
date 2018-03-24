import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class ApiSubjectRest { 
constructor(private http: HttpClient) {
}
/**
 * @api {get} @/api/subject/list
 * @apiName list
 * @apiGroup ApiSubjectController
*/
list() {
   const url = `@/api/subject/list`
   return this.http.get(url);
}

}
