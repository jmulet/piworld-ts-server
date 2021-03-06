import { Body, Controller, Delete, Get, Post, QueryParam, Session, UseBefore, Param, Put } from 'routing-controllers';
import { Inject } from 'typedi';

import { SchoolModel } from '../../entities/SchoolModel';
import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { AdminsOnly, RootOnly } from '../../middlewares/AuthorizedMdw';
import { SchoolSrv } from '../../services/SchoolSrv';
import { SessionSrv } from '../../services/SessionSrv';
import { SessionModel } from '../../model/SessionModel';
import { UserRoles } from '../../entities/UserModel';


@Controller("/api/school")
@UseBefore(AuthenticatedMdw) 
export class ApiSchoolController {
  
    @Inject()
    schoolSrv: SchoolSrv;

    @Inject()
    sessionSrv: SessionSrv;
 

    @Get("/list")
    @UseBefore(AdminsOnly)
    async list(@Session() session: SessionModel, @QueryParam("idSchool") id: number) {      
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

    @Post("/")
    @UseBefore(AdminsOnly)
    save(@Body({ validate: true, required: true }) entity: SchoolModel) {            
        return this.schoolSrv.save(entity);
    }

    @Put("/:id")
    @UseBefore(AdminsOnly)
    update(@Param("id") id: number, @Body({ validate: true, required: true }) entity: SchoolModel) {            
        entity.id = id;
        return this.schoolSrv.save(entity);
    }

    @Delete("/:idSchool")
    @UseBefore(RootOnly)
    async delete(@Param("idSchool") idSchool: number) {             
        return this.schoolSrv.deleteById(idSchool);
    }

}

 