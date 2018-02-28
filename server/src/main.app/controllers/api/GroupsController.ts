import { Controller, Get, Render, Session, UseBefore, Body, Delete, QueryParam, Post } from 'routing-controllers';
import { Inject } from 'typedi';
import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { GroupsModel } from '../../entities/GroupsModel';
import { GroupsSrv } from '../../services/GroupsSrv';
import { AdminsAndTeachersOnly } from '../../middlewares/AuthorizedMdw';

@Controller("/api")
@UseBefore(AuthenticatedMdw)
export class GroupsController {
 
    @Inject()
    groupsSrv: GroupsSrv;

    @Post("/group/save")
    @UseBefore(AdminsAndTeachersOnly)
    save(@Body({validate: true}) entity: GroupsModel) {        
        return this.groupsSrv.save(entity);
    }
    
    @Delete("/group/delete")
    @UseBefore(AdminsAndTeachersOnly)
    delete(@QueryParam("idGroup") idGroup: number) {        
        return this.groupsSrv.deleteById(idGroup);
    }
}
