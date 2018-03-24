import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore, Param, Put } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { AdminsOnly, RootOnly } from '../../middlewares/AuthorizedMdw';
import { HolidaySrv } from '../../services/HolidaySrv';
import { SessionSrv } from '../../services/SessionSrv';
import { SessionModel } from '../../model/SessionModel';
import { UserRoles } from '../../entities/UserModel';
import { HolidayModel } from '../../entities/HolidayModel';
import { TermsModel } from '../../entities/TermsModel';
import { TermsSrv } from '../../services/TermSrv';


@Controller("/api/school/term")
@UseBefore(AuthenticatedMdw) 
export class ApiSchoolTermController {
  
    @Inject()
    termSrv: TermsSrv;

    @Inject()
    sessionSrv: SessionSrv;
 
    @Get("/")
    @UseBefore(RootOnly)
    get(@QueryParam("idTerm") idTerm: number) {             
        return this.termSrv.findById(idTerm);
    }

    @Get("/list")
    @UseBefore(AdminsOnly)
    async list(@Session() session: SessionModel, @QueryParam("year", {required: true}) year: number,
        @QueryParam("idSchool") id: number, @QueryParam("schoolName") name: string) {      
        if (name) {
            return this.termSrv.findBySchoolName(name, year);        
        } else {
            return this.termSrv.findBySchoolId(id, year);        
        }
    }

    @Post("/")
    @UseBefore(AdminsOnly)
    save(@Body({ validate: true, required: true }) entity: TermsModel) {            
        return this.termSrv.save(entity);
    }

    @Put("/:id")
    @UseBefore(AdminsOnly)
    update(@Param("id") id: number, @Body({ validate: true, required: true }) entity: TermsModel) {            
        entity.id = id;
        return this.termSrv.save(entity);
    }

    @Delete("/:idTerm")
    @UseBefore(RootOnly)
    async delete(@Param("idTerm") idTerm: number) {             
        return this.termSrv.deleteById(idTerm);
    }

}

 