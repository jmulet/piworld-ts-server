import { Controller, Get, Render, Session, UseBefore, Body, Delete, QueryParam, Post, Param, Put } from 'routing-controllers';
import { Inject } from 'typedi';
import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { GroupsModel } from '../../entities/classroom/GroupsModel';
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

    @Put("/:id")
    @UseBefore(AdminsAndTeachersOnly)
    update(@Param("id") id: number, @Body({validate: true}) entity: GroupsModel) { 
        entity.id = id;       
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
    
    @Delete("/:idGroup")
    @UseBefore(AdminsAndTeachersOnly)
    async del(@Param("idGroup") idGroup: number) {     
        return this.groupsSrv.deleteById(idGroup);
    }
}
