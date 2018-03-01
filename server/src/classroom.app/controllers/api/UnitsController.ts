
 import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore } from 'routing-controllers';
 import { Inject } from 'typedi';
 import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
 import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
 import { UnitSrv } from '../../services/UnitSrv';
 import { SessionModel } from '../../../main.app/model/SessionModel';
import { UnitModel } from '../../entities';
   
 @Controller("/api/units")
 @UseBefore(AuthenticatedMdw) 
 export class UnitsController {
   
     @Inject()
     unitSrv: UnitSrv;
   
     @Get("/listAssigned")
     listAssigned(@QueryParam("idGroup") idGroup: number, @QueryParam("idUser") idUser: number) {             
         return this.unitSrv.listAssigned(idGroup, idUser);
     }

     @Get("/listCreated")
     @UseBefore(AdminsAndTeachersOnly)
     listCreated(@QueryParam("idGroup") idGroup: number) {             
         return this.unitSrv.listCreated(idGroup);
     }

     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     assignmentSave(@Body({ validate: true }) entity: UnitModel) {            
         return this.unitSrv.save(entity);
     }
 
     @Delete("/")
     @UseBefore(AdminsAndTeachersOnly)
     assignmentDelete(@QueryParam("idAssignment") idAssignment: number) {             
         return this.unitSrv.deleteById(idAssignment);
     }
 
 }