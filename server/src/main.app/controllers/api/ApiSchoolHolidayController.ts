import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { AdminsOnly, RootOnly } from '../../middlewares/AuthorizedMdw';
import { HolidaySrv } from '../../services/HolidaySrv';
import { SessionSrv } from '../../services/SessionSrv';
import { SessionModel } from '../../model/SessionModel';
import { UserRoles } from '../../entities/UserModel';
import { HolidayModel } from '../../entities/HolidayModel';


@Controller("/api/school/holiday")
@UseBefore(AuthenticatedMdw) 
export class ApiSchoolHolidayController {
  
    @Inject()
    holidaySrv: HolidaySrv;

    @Inject()
    sessionSrv: SessionSrv;
 
    @Get("/")
    @UseBefore(RootOnly)
    get(@QueryParam("idHoliday") idHoliday: number) {             
        return this.holidaySrv.findById(idHoliday);
    }

    @Get("/list")
    @UseBefore(AdminsOnly)
    async list(@Session() session: SessionModel, @QueryParam("idSchool") id: number, @QueryParam("schoolName") name: string) {      
        if (name) {
            return this.holidaySrv.findBySchoolName(name);        
        } else {
            return this.holidaySrv.findBySchoolId(id);        
        }
    }

    @Post("/")
    @UseBefore(AdminsOnly)
    centerSave(@Body({ validate: true }) entity: HolidayModel) {            
        return this.holidaySrv.save(entity);
    }

    @Delete("/")
    @UseBefore(RootOnly)
    async centerDelete(@QueryParam("idHoliday") idHoliday: number) {             
        return this.holidaySrv.deleteById(idHoliday);
    }

}

 