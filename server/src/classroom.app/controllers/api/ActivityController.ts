import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, Post, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { filterLang } from '../../../main.app/utils/filterLang';
import { langInspector } from '../../../main.app/utils/LangInspector';
import { ActivityModel } from '../../entities';
import { ActivitySrv } from '../../services/ActivitySrv';

   
 @Controller("/api/activity")
 export class AssignmentsController {
   
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
     save(@Body({ validate: true }) entity: ActivityModel) {            
         return this.activitySrv.save(entity);
     }
 
     @Delete("/")
     @UseBefore(AuthenticatedMdw) 
     @UseBefore(AdminsAndTeachersOnly)
     del(@QueryParam("idActivity") idActivity: number) {             
         return this.activitySrv.deleteById(idActivity);
     }
 
 }