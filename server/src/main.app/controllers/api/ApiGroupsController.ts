import { Controller, Get, Render, Session, UseBefore, Body, Delete, QueryParam, Post } from 'routing-controllers';
import { Inject } from 'typedi';
import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { GroupsModel } from '../../../classroom.app/entities/GroupsModel';
import { GroupsSrv } from '../../../classroom.app/services/GroupsSrv';
import { AdminsAndTeachersOnly } from '../../middlewares/AuthorizedMdw';

@Controller("/api/group")
@UseBefore(AuthenticatedMdw)
export class ApiGroupsController {
 
    @Inject()
    groupsSrv: GroupsSrv;

    @Post("/")
    @UseBefore(AdminsAndTeachersOnly)
    save(@Body({validate: true}) entity: GroupsModel) {        
        return this.groupsSrv.save(entity);
    }
   
    @Get("/")
    get(@QueryParam("idGroup") idGroup: number) {        
        return this.groupsSrv.find(idGroup);
    }

    @Get("/created")
    getCreated(@QueryParam("idUser") idUser: number) {        
        return this.groupsSrv.findCreated(idUser);
    }
    
    @Delete("/")
    @UseBefore(AdminsAndTeachersOnly)
    async del(@QueryParam("idGroup") idGroup: number) {     
        return this.groupsSrv.deleteById(idGroup);
    }
}
