
 import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore } from 'routing-controllers';
 import { Inject } from 'typedi';
 import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
 import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
 import { AssignmentSrv } from '../../services/AssignmentSrv';
 import { SessionModel } from '../../../main.app/model/SessionModel';
import { AssignmentModel } from '../../entities';
   
 @Controller("/api/assignments")
 @UseBefore(AuthenticatedMdw) 
 export class AssignmentsController {
   
     @Inject()
     assignmentSrv: AssignmentSrv;
   
     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     assignmentSave(@Body({ validate: true }) entity: AssignmentModel) {            
         return this.assignmentSrv.save(entity);
     }
 
     @Delete("/")
     @UseBefore(AdminsAndTeachersOnly)
     async assignmentDelete(@QueryParam("idAssignment") idAssignment: number) {             
         await this.assignmentSrv.deleteById(idAssignment);
         return true;
     }
 
 }