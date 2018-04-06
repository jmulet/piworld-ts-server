import { Body, Controller, Delete, Get, Post, QueryParam, UseBefore, Param, Put } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { ChallengesModel } from '../../../main.app/entities/classroom/ChallengesModel';
import { ChallengeSrv } from '../../services/ChallengeSrv';
import { ChallengesQuizzModel } from '../../../main.app/entities/classroom/ChallengesQuizzModel';



 @Controller("/api/challenges")
 @UseBefore(AuthenticatedMdw) 
 export class ApiChallengesController {
   
     @Inject()
     challengesSrv: ChallengeSrv;

     @Get("/list")
     list(@QueryParam("level") level: string, @QueryParam("day") day: Date, 
          @QueryParam("idUser") idUser: number) {             
         
            return this.challengesSrv.list(level, day, idUser)
     }
   
     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true, required: true }) entity: ChallengesModel) {            
         return this.challengesSrv.save(entity);
     }

     @Post("/quizz")
     @UseBefore(AdminsAndTeachersOnly)
     saveQuizz(@Body({ validate: true, required: true }) entity: ChallengesQuizzModel) {            
         return this.challengesSrv.saveQuizz(entity);
     }

     @Put("/:id")
     @UseBefore(AdminsAndTeachersOnly)
     update(@Param("id") id: number, @Body({ validate: true, required: true }) entity: ChallengesModel) {            
        entity.id = id; 
        return this.challengesSrv.save(entity);
     }
 
     @Delete("/:idChallenge")
     @UseBefore(AdminsAndTeachersOnly)
     delete(@Param("idChallenge") idChallenge: number) {             
         return this.challengesSrv.deleteById(idChallenge);
     }
 
 }