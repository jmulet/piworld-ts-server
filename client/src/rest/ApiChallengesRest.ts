import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChallengesModel } from '../entities/ChallengesModel';
import { ChallengesQuizzModel } from '../entities/ChallengesQuizzModel';

@Injectable()
export class ApiChallengesRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/challenges/list
    * @apiName list
    * @apiGroup ApiChallengesController
   */
   list(level?: string, day?: Object, idUser?: number) {
         const queryParamsObj: any = {};
          if (level!=null) {
               queryParamsObj.level = level + "";
          }
          if (day!=null) {
               queryParamsObj.day = day + "";
          }
          if (idUser!=null) {
               queryParamsObj.idUser = idUser + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/challenges/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/challenges/
    * @apiName save
    * @apiGroup ApiChallengesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   save(entity: ChallengesModel) {
         const url = `@/api/challenges/`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/api/challenges/quizz
    * @apiName saveQuizz
    * @apiGroup ApiChallengesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   saveQuizz(entity: ChallengesQuizzModel) {
         const url = `@/api/challenges/quizz`
         return this.http.post(url, entity);
   }
   /**
    * @api {put} @/api/challenges/:id
    * @apiName update
    * @apiGroup ApiChallengesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   update(id: number, entity: ChallengesModel) {
         const pathParams: any = {};
          if (id!=null) {
               pathParams.id = id + "";
          }
         const url = `@/api/challenges/${pathParams.id}`
         return this.http.put(url, entity);
   }
   /**
    * @api {delete} @/api/challenges/:idChallenge
    * @apiName delete
    * @apiGroup ApiChallengesController
    * @apiPermission Accepted roles 0, 100, 50, 150
   */
   delete(idChallenge: number) {
         const pathParams: any = {};
          if (idChallenge!=null) {
               pathParams.idChallenge = idChallenge + "";
          }
         const url = `@/api/challenges/${pathParams.idChallenge}`
         return this.http.delete(url);
   }
}
