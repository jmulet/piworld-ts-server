import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { SchoolModel } from '../../../main.app/entities/SchoolModel';
import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsOnly, RootOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { SchoolSrv } from '../../../main.app/services/SchoolSrv';
import { SessionSrv } from '../../../main.app/services/SessionSrv';
import { SessionModel } from '../../../main.app/model/SessionModel';
import { UserRoles } from '../../../main.app/entities/UserModel';



@Controller("/api/center")
@UseBefore(AuthenticatedMdw) 
export class ApiCenterController {
  
    @Inject()
    schoolSrv: SchoolSrv;

    @Inject()
    sessionSrv: SessionSrv;
 

    @Get("/list")
    @UseBefore(AdminsOnly)
    async centerList(@Session() session: SessionModel, @QueryParam("id") id: number) {      
        if (id) {
            return this.schoolSrv.findById(id);
        } else {
            let list = await this.schoolSrv.list();
            const currentUser = session.user;
            if (currentUser.idRole !== UserRoles.admin) {
                list = list.filter( (c) => c.schoolName !== 'buildin_admin_school');
            }
            return list;
        }        
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

 