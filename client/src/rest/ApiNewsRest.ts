import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsModel } from '../entities/NewsModel';

@Injectable()
export class ApiNewsRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/news/list
    * @apiName list
    * @apiGroup ApiNewsController
   */
   list(limit?: number) {
         const queryParamsObj: any = {};
          if (limit!=null) {
               queryParamsObj.limit = limit + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/news/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/news/:idNews
    * @apiName get
    * @apiGroup ApiNewsController
   */
   get(idNews: number) {
         const pathParams: any = {};
          if (idNews!=null) {
               pathParams.idNews = idNews + "";
          }
         const url = `@/api/news/${pathParams.idNews}`
         return this.http.get(url);
   }
   /**
    * @api {post} @/api/news/
    * @apiName save
    * @apiGroup ApiNewsController
   */
   save(entity?: NewsModel) {
         const url = `@/api/news/`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/news/:idNews
    * @apiName update
    * @apiGroup ApiNewsController
   */
   update(idNews: number, entity?: NewsModel) {
         const pathParams: any = {};
          if (idNews!=null) {
               pathParams.idNews = idNews + "";
          }
         const url = `@/api/news/${pathParams.idNews}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/news/:idNews
    * @apiName delete
    * @apiGroup ApiNewsController
   */
   delete(idNews: number) {
         const pathParams: any = {};
          if (idNews!=null) {
               pathParams.idNews = idNews + "";
          }
         const url = `@/api/news/${pathParams.idNews}`
         return this.http.delete(url);
   }
   /**
    * @api {post} @/api/news/ordering
    * @apiName saveOrdering
    * @apiGroup ApiNewsController
   */
   saveOrdering(entity?: any) {
         const url = `@/api/news/ordering`
         return this.http.post(url, entity);
   }
}
