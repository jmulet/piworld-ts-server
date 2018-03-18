import { Controller, Get, QueryParam, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { UnitSrv } from '../../services/UnitSrv';
import { GroupsSrv } from '../../services/GroupsSrv';


   
 @Controller("/api/group")
 @UseBefore(AuthenticatedMdw) 
 export class UnitsController {
   
     @Inject()
     groupSrv: GroupsSrv;
   
     @Get("/list")
     list(@QueryParam("idCourse") idCourse: number) {             
         return this.groupSrv.findByIdCourse(idCourse);
     }
 }