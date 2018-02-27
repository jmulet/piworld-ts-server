import { Body, Controller, Delete, Get, Post, QueryParam, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { BadgesModel } from '../../entities';
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
   
     @Post("/save")
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true }) entity: BadgesModel) {            
         return this.badgesSrv.save(entity);
     }
 
     @Delete("/delete")
     @UseBefore(AdminsAndTeachersOnly)
     delete(@QueryParam("idActivity") idActivity: number) {             
         return this.badgesSrv.deleteById(idActivity);
     }
 
 }