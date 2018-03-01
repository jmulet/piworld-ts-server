
 import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore } from 'routing-controllers';
 import { Inject } from 'typedi';
 import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
 import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
 import { CourseSrv } from '../../services/CourseSrv';
 import { SessionModel } from '../../../main.app/model/SessionModel';
 import { CourseModel } from '../../entities/CourseModel';
   
 @Controller("/api/course")
 @UseBefore(AuthenticatedMdw) 
 export class CourseController {
   
     @Inject()
     courseSrv: CourseSrv;
     
     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true }) entity: CourseModel) {            
         return this.courseSrv.save(entity);
     }
 
     @Delete("/")
     @UseBefore(AdminsAndTeachersOnly)
     del(@QueryParam("idCourse") idAssignment: number) {             
         return this.courseSrv.deleteById(idAssignment);
     }
 
 }