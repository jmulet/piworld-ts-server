import { Body, Controller, Delete, Get, Post, QueryParam, UseBefore, Param, Put } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { BadgesModel } from '../../../main.app/entities/classroom/BadgesModel';
import { BadgesSrv } from '../../services/BadgesSrv';


 @Controller("/api/badges")
 @UseBefore(AuthenticatedMdw) 
 export class BadgesController {
   
     @Inject()
     badgesSrv: BadgesSrv;

     @Get("/list")
     list(@QueryParam("idGroup") idGroup: number, @QueryParam("idUser") idUser: number, 
          @QueryParam("fromType") fromType: number, @QueryParam("toType") toType: number,
          @QueryParam("fromDate") fromDate: Date, @QueryParam("toDate") toDate: Date) {             
         
            return this.badgesSrv.list(idGroup, idUser, fromDate, toDate, fromType, toType);         
     }
   
     @Post("/")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true }) entity: BadgesModel) {            
         return this.badgesSrv.save(entity);
     }

     @Put("/:id")
     @UseBefore(AdminsAndTeachersOnly)
     update(@Param("id") id: number, @Body({ validate: true }) entity: BadgesModel) {            
         entity.id = id;
         return this.badgesSrv.save(entity);
     }
 
     @Delete("/:idBadge")
     @UseBefore(AdminsAndTeachersOnly)
     del(@Param("idBadge") idBadge: number) {             
         return this.badgesSrv.deleteById(idBadge);
     }
 
 }