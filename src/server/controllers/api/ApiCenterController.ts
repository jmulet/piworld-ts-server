import { Body, Controller, Delete, Get, Post, QueryParam, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { SchoolModel } from '../../entities/SchoolModel';
import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { AdminsOnly, RootOnly } from '../../middlewares/AuthorizedMdw';
import { SchoolSrv } from '../../services/SchoolSrv';
import { SessionSrv } from '../../services/SessionSrv';



@Controller("/api/center")
@UseBefore(AuthenticatedMdw) 
export class ApiCenterController {
  
    @Inject()
    schoolSrv: SchoolSrv;

    @Inject()
    sessionSrv: SessionSrv;
 

    @Get("/list")
    @UseBefore(AdminsOnly)
    centerList() {      
        return this.schoolSrv.list();
    }

    @Post("/save")
    @UseBefore(AdminsOnly)
    centerSave(@Body({ validate: true }) entity: SchoolModel) {      
        return this.schoolSrv.save(entity);
    }

    @Delete("/delete")
    @UseBefore(RootOnly)
    async centerDelete(@QueryParam("schoolId") schoolId: number) {             
        return this.schoolSrv.deleteById(schoolId);
    }

}

 