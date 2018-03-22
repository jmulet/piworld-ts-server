import { Controller, Get, QueryParam, UseBefore, Delete, Param, Body, Put, Post } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { UnitSrv } from '../../services/UnitSrv';
import { GroupsSrv } from '../../services/GroupsSrv';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { GroupsModel } from '../../../main.app/entities/classroom/GroupsModel';


   
 @Controller("/api/group")
 @UseBefore(AuthenticatedMdw) 
 export class UnitsController {
   
     @Inject()
     groupSrv: GroupsSrv;
   
     @Get("/list")
     list(@QueryParam("idCourse") idCourse: number, @QueryParam("idCreator") idCreator: number) {  
         return this.groupSrv.findByIdCourse(idCourse, idCreator);
     }
   
     @Get("/:idGroup")
     get(@Param("idGroup") idGroup: number) {        
         return this.groupSrv.find(idGroup);
     }

     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({validate: true}) entity: GroupsModel) {        
         return this.groupSrv.save(entity);
     }
 
     @Put("/:id")
     @UseBefore(AdminsAndTeachersOnly)
     update(@Param("id") id: number, @Body({validate: true}) entity: GroupsModel) { 
         entity.id = id;       
         return this.groupSrv.save(entity);
     }

     
     @Delete("/:idGroup")
     @UseBefore(AdminsAndTeachersOnly)
     async del(@Param("idGroup") idGroup: number) {     
         return this.groupSrv.deleteById(idGroup);
     }
 }