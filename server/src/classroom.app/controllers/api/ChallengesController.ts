import { Body, Controller, Delete, Get, Post, QueryParam, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { ChallengesModel } from '../../entities';
import { ChallengeSrv } from '../../services/ChallengeSrv';



 @Controller("/api/challenges")
 @UseBefore(AuthenticatedMdw) 
 export class ChallengesController {
   
     @Inject()
     challengesSrv: ChallengeSrv;

     @Get("/list")
     list(@QueryParam("level") level: string, @QueryParam("day") day: Date, 
          @QueryParam("idUser") idUser: number) {             
         
            return this.challengesSrv.list(level, day, idUser)
     }
   
     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true }) entity: ChallengesModel) {            
         return this.challengesSrv.save(entity);
     }
 
     @Delete("/")
     @UseBefore(AdminsAndTeachersOnly)
     del(@QueryParam("idChallenge") idChallenge: number) {             
         return this.challengesSrv.deleteById(idChallenge);
     }
 
 }