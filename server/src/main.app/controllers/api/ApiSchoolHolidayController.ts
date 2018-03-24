import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore, Param, Put, Req } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { AdminsOnly, RootOnly } from '../../middlewares/AuthorizedMdw';
import { HolidaySrv } from '../../services/HolidaySrv';
import { SessionSrv } from '../../services/SessionSrv';
import { SessionModel } from '../../model/SessionModel';
import { UserRoles } from '../../entities/UserModel';
import { HolidayModel } from '../../entities/HolidayModel';
import { Request } from 'superagent';


@Controller("/api/school/holiday")
//@UseBefore(AuthenticatedMdw) 
export class ApiSchoolHolidayController {
  
    @Inject()
    holidaySrv: HolidaySrv;

    @Inject()
    sessionSrv: SessionSrv;
 
    @Get("/:idHoliday")
    @UseBefore(RootOnly)
    get(@Param("idHoliday") idHoliday: number) {             
        return this.holidaySrv.findById(idHoliday);
    }

    @Get("/list")
    @UseBefore(AdminsOnly)
    async list(@Session() session: SessionModel, @QueryParam("year", {required: true}) year: number, @QueryParam("idSchool") id: number,
               @QueryParam("schoolName") name: string) {      
        if (name) {
            return this.holidaySrv.findBySchoolName(name, year);        
        } else {
            return this.holidaySrv.findBySchoolId(id, year);        
        }
    }

    @Post("/")
   // @UseBefore(AdminsOnly)
    //
    save(@Body({ validate: true, required: true }) entity: HolidayModel) {        
        return this.holidaySrv.save(entity);
    }

    @Put("/:id")
    @UseBefore(AdminsOnly)
    update(@Param("id") id: number, @Body({ validate: true, required: true }) entity: HolidayModel) {            
        entity.id = id;
        return this.holidaySrv.save(entity);
    }

    @Delete("/:idHoliday")
    @UseBefore(RootOnly)
    async delete(@Param("idHoliday") idHoliday: number) {             
        return this.holidaySrv.deleteById(idHoliday);
    }

}

 