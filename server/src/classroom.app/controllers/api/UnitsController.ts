import { Body, Controller, Delete, Get, Post, QueryParam, UseBefore, Param, Put } from 'routing-controllers';
import { Inject } from 'typedi';

import { UnitModel } from '../../../main.app/entities/classroom/UnitModel';
import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { UnitSrv } from '../../services/UnitSrv';

 
 @Controller("/api/units")
 @UseBefore(AuthenticatedMdw) 
 export class UnitsController {
   
     @Inject()
     unitSrv: UnitSrv;
   
     @Get("/listAssigned")
     listAssigned(@QueryParam("idCourse") idGroup: number, @QueryParam("idUser") idUser: number) {             
         return this.unitSrv.listAssigned(idGroup, idUser);
     }

     @Get("/listCreated")
     @UseBefore(AdminsAndTeachersOnly)
     listCreated(@QueryParam("idCourse") idGroup: number) {             
         return this.unitSrv.listCreated(idGroup);
     }

     @Get("/list")
     @UseBefore(AdminsAndTeachersOnly)
     listUnitsOnly(@QueryParam("idCourse") idGroup: number) {             
         return this.unitSrv.listUnitsOnly(idGroup);
     }

     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true }) entity: UnitModel) {            
         return this.unitSrv.save(entity);
     }

     @Put("/")
     @UseBefore(AdminsAndTeachersOnly)
     saveOrdering(@Body() entities: UnitModel[]) {            
         return this.unitSrv.saveList(entities);
     }

     @Put("/:id")
     @UseBefore(AdminsAndTeachersOnly)
     update(@Param("id") id: number, @Body({ validate: true }) entity: UnitModel) {            
         entity.id = id;
         return this.unitSrv.save(entity);
     }
 
     @Delete("/:idUnit")
     @UseBefore(AdminsAndTeachersOnly)
     del(@Param("idUnit") idUnit: number) {             
         return this.unitSrv.deleteById(idUnit);
     }
 
 }