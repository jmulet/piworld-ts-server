
 import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore, Param, Put } from 'routing-controllers';
 import { Inject } from 'typedi';
 import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
 import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
 import { CourseSrv } from '../../services/CourseSrv';
 import { SessionModel } from '../../../main.app/model/SessionModel';
 import { CourseModel } from '../../../main.app/entities/classroom/CourseModel';
   
 @Controller("/api/course")
 @UseBefore(AuthenticatedMdw) 
 export class ApiCourseController {
   
     @Inject()
     courseSrv: CourseSrv;
     
     @Get("/:id")
     get(@Param("id") idCourse: number) {            
         return this.courseSrv.findById(idCourse);
     }

     /** If created queryParam is set, then lists courses created by idUser
      * otherwise, lists the courses in which idUser is enrolled.
     */
     @Get("/list/:idUser")
     list(@Param("idUser") idUser: number, @QueryParam("created") created: boolean) {            
         return this.courseSrv.list(idUser, created);
     }

     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true, required: true }) entity: CourseModel) {            
         return this.courseSrv.save(entity);
     }

     @Put("/:id")
     @UseBefore(AdminsAndTeachersOnly)
     update(@Param("id") id: number, @Body({ validate: true, required: true }) entity: CourseModel) {            
         entity.id = id;
         return this.courseSrv.save(entity);
     }
 
     @Delete("/:id")
     @UseBefore(AdminsAndTeachersOnly)
     delete(@Param("id") idCourse: number) {             
         return this.courseSrv.deleteById(idCourse);
     }
 
 }