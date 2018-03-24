import { Body, Controller, Delete, Param, Post, UseBefore, Put } from 'routing-controllers';
import { Inject } from 'typedi';

import { SectionModel } from '../../../main.app/entities/classroom/SectionModel';
import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { SectionSrv } from '../../services/SectionSrv';

 
 @Controller("/api/section")
 @UseBefore(AuthenticatedMdw) 
 export class ApiSectionController {
   
     @Inject()
     sectionSrv: SectionSrv;
   
     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true, required: true }) entity: SectionModel) {            
         return this.sectionSrv.save(entity);
     }

     @Put("/:id")
     @UseBefore(AdminsAndTeachersOnly)
     update(@Param("id") id, @Body({ validate: true, required: true }) entity: SectionModel) {            
         entity.id = id;
         return this.sectionSrv.save(entity);
     }
 
     @Delete("/:idSection")
     @UseBefore(AdminsAndTeachersOnly)
     async delete(@Param("idSection") idSection: number) {             
         await this.sectionSrv.deleteById(idSection);
         return true;
     }
 
 }