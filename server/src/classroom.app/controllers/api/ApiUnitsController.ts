import { Body, Controller, Delete, Get, Post, QueryParam, UseBefore, Param, Put } from 'routing-controllers';
import { Inject } from 'typedi';

import { UnitModel } from '../../../main.app/entities/classroom/UnitModel';
import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { UnitSrv } from '../../services/UnitSrv';

 
 @Controller("/api/units")
 @UseBefore(AuthenticatedMdw) 
 export class ApiUnitsController {
   
     @Inject()
     unitSrv: UnitSrv;
   
     @Get("/assigned/:idCourse")
     listAssigned(@Param("idCourse") idGroup: number, @QueryParam("idUser") idUser: number) {             
         return this.unitSrv.listAssigned(idGroup, idUser);
     }

     @Get("/created/:idCourse")
     @UseBefore(AdminsAndTeachersOnly)
     listCreated(@Param("idCourse") idGroup: number) {             
         return this.unitSrv.listCreated(idGroup);
     }

     @Get("/list/:idCourse")
     @UseBefore(AdminsAndTeachersOnly)
     listUnitsOnly(@Param("idCourse") idGroup: number) {             
         return this.unitSrv.listUnitsOnly(idGroup);
     }

     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true, required: true }) entity: UnitModel) {            
         return this.unitSrv.save(entity);
     }

     @Put("/")
     @UseBefore(AdminsAndTeachersOnly)
     saveOrdering(@Body({required: true}) entities: UnitModel[]) {            
         return this.unitSrv.saveList(entities);
     }

     @Put("/:id")
     @UseBefore(AdminsAndTeachersOnly)
     update(@Param("id") id: number, @Body({ validate: true, required: true }) entity: UnitModel) {            
         entity.id = id;
         return this.unitSrv.save(entity);
     }
 
     @Delete("/:idUnit")
     @UseBefore(AdminsAndTeachersOnly)
     delete(@Param("idUnit") idUnit: number) {             
         return this.unitSrv.deleteById(idUnit);
     }
 
 }