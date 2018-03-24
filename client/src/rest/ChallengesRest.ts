import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChallengesModel } from "../entities/ChallengesModel" 


@Injectable()
export  class ChallengesRest {
constructor(private http: HttpClient) {}
/**
 * @api {get} @/api/challenges/list
 * @apiName list
 * @apiGroup ChallengesController
*/
list(level?: string, day?: Object, idUser?: number) {
const queryParams = new HttpParams({
   fromObject: {
      level: level + "",
      day: day + "",
      idUser: idUser + "",
  }
});
   return this.http.get("@/api/challenges/list", {params: queryParams});
}
/**
 * @api {post} @/api/challenges/
 * @apiName save
 * @apiGroup ChallengesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
save(entity?: ChallengesModel) {
   return this.http.post("@/api/challenges/", entity);
}
/**
 * @api {put} @/api/challenges/:id
 * @apiName update
 * @apiGroup ChallengesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
update(id: number, entity?: ChallengesModel) {
const pathParams = {
      id: id,
};
   return this.http.put("@/api/challenges/${pathParams.id}", entity);
}
/**
 * @api {delete} @/api/challenges/:idChallenge
 * @apiName del
 * @apiGroup ChallengesController
 * @apiPermission Accepted roles 0, 100, 50, 150
*/
del(idChallenge: number) {
const pathParams = {
      idChallenge: idChallenge,
};
   return this.http.delete("@/api/challenges/${pathParams.idChallenge}");
}
}
