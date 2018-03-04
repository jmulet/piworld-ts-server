import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore } from 'routing-controllers';
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
    async list(@Session() session: SessionModel, @QueryParam("idSchool") id: number, @QueryParam("schoolName") name: string) {      
        if (name) {
            return this.termSrv.findBySchoolName(name);        
        } else {
            return this.termSrv.findBySchoolId(id);        
        }
    }

    @Post("/")
    @UseBefore(AdminsOnly)
    centerSave(@Body({ validate: true }) entity: TermsModel) {            
        return this.termSrv.save(entity);
    }

    @Delete("/")
    @UseBefore(RootOnly)
    async centerDelete(@QueryParam("idTerm") idTerm: number) {             
        return this.termSrv.deleteById(idTerm);
    }

}

 