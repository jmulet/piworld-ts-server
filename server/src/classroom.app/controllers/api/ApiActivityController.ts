import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, Post, QueryParam, Req, Res, UseBefore, Param, Put } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { filterLang } from '../../../main.app/utils/filterLang';
import { langInspector } from '../../../main.app/utils/LangInspector';
import { ActivityModel } from '../../../main.app/entities/classroom/ActivityModel';
import { ActivitySrv } from '../../services/ActivitySrv';

   
 @Controller("/api/activity")
 export class ApiActivityController {
   
     @Inject()
     activitySrv: ActivitySrv;

     @Get("/search")
     async search(@QueryParam("text") text: string, @QueryParam("limit") limit: number, @QueryParam("offset") offset: number,
        @Req() request: Request, @Res() response: Response ) {             
         const result = await this.activitySrv.search(text, limit, offset);
         // Need to apply translation of result
         const lang = await langInspector(request, response);    
         return filterLang(result, ["activity", "description"], lang);
     }
   
     @Post("/")
     @UseBefore(AuthenticatedMdw) 
     @UseBefore(AdminsAndTeachersOnly)
     save(@Body({ validate: true, required: true }) entity: ActivityModel) {            
         return this.activitySrv.save(entity);
     }

     @Put("/:id")
     @UseBefore(AuthenticatedMdw) 
     @UseBefore(AdminsAndTeachersOnly)
     update(@Param("id") id: number, @Body({ validate: true, required: true }) entity: ActivityModel) {     
         entity.id = id;       
         return this.activitySrv.save(entity);
     }
 
     @Delete("/:idActivity")
     @UseBefore(AuthenticatedMdw) 
     @UseBefore(AdminsAndTeachersOnly)
     delete(@Param("idActivity") idActivity: number) {             
         return this.activitySrv.deleteById(idActivity);
     }
 
 }