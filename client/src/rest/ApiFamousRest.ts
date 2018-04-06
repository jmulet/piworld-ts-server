import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FamousEqnModel } from '../entities/FamousEqnModel';
import { FamousQuoteModel } from '../entities/FamousQuoteModel';

@Injectable()
export class ApiFamousRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/famous/:type/list
    * @apiName list
    * @apiGroup ApiFamousController
   */
   list(type: string) {
         const pathParams: any = {};
          if (type!=null) {
               pathParams.type = type + "";
          }
         const url = `@/api/famous/${pathParams.type}/list`
         return this.http.get(url);
   }
   /**
    * @api {get} @/api/famous/:type/get/:id
    * @apiName get
    * @apiGroup ApiFamousController
   */
   get(type: string, id: number) {
         const pathParams: any = {};
          if (type!=null) {
               pathParams.type = type + "";
          }
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/famous/${pathParams.type}/get/${pathParams.id}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/famous/equation
    * @apiName saveEquation
    * @apiGroup ApiFamousController
   */
   saveEquation(entity: FamousEqnModel) {
         const url = `@/api/famous/equation`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/api/famous/quote
    * @apiName saveQuote
    * @apiGroup ApiFamousController
   */
   saveQuote(entity: FamousQuoteModel) {
         const url = `@/api/famous/quote`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/api/famous/:type/import
    * @apiName massiveImport
    * @apiGroup ApiFamousController
   */
   massiveImport(type: string, entity: any) {
         const pathParams: any = {};
          if (type!=null) {
               pathParams.type = type + "";
          }
         const url = `@/api/famous/${pathParams.type}/import`
         return this.http.post(url, entity);
   }
   /**
    * @api {delete} @/api/famous/:type/:id
    * @apiName delete
    * @apiGroup ApiFamousController
   */
   delete(type: string, id: number) {
         const pathParams: any = {};
          if (type!=null) {
               pathParams.type = type + "";
          }
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/famous/${pathParams.type}/${pathParams.id}`
         return this.http.delete(url);
   }
}
