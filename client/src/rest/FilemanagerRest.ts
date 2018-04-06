import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FilemanagerRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/filemanager.htm
    * @apiName filemanagerPage
    * @apiGroup FilemanagerController
   */
   filemanagerPage() {
         const url = `@/filemanager.htm`
         return this.http.get(url);
   }
}
