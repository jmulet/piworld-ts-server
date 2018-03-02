
 import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore } from 'routing-controllers';
 import { Inject } from 'typedi';
 import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
 import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
 import { SectionSrv } from '../../services/SectionSrv';
 import { SessionModel } from '../../../main.app/model/SessionModel'; 
import { SectionModel } from '../../entities/SectionModel';
   
 @Controller("/api/assignments")
 @UseBefore(AuthenticatedMdw) 
 export class AssignmentsController {
   
     @Inject()
     sectionSrv: SectionSrv;
   
     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     assignmentSave(@Body({ validate: true }) entity: SectionModel) {            
         return this.sectionSrv.save(entity);
     }
 
     @Delete("/")
     @UseBefore(AdminsAndTeachersOnly)
     async assignmentDelete(@QueryParam("idAssignment") idAssignment: number) {             
         await this.sectionSrv.deleteById(idAssignment);
         return true;
     }
 
 }