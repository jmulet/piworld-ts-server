import * as express from 'express';
import { Controller, Get, Post, QueryParam, Req, Session, UseBefore, Delete, Body, Res } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { AdminsAndTeachersOnly, AdminsOnly } from '../../middlewares/AuthorizedMdw';
import { EncryptedBodyMdw } from '../../middlewares/EncryptedBodyMdw';
import { SessionModel } from '../../model/SessionModel';
import { SessionSrv } from '../../services/SessionSrv';
import { UserSrv } from '../../services/UserSrv';
import { UserRoles, UserModel } from '../../entities/UserModel';



@Controller("/api/users")
@UseBefore(AuthenticatedMdw) 
export class ApiUsersController {
 
    @Inject()
    userSrv: UserSrv;
 
    @Inject()
    sessionSrv: SessionSrv;

    @Post("/auth")    
    @UseBefore(EncryptedBodyMdw)
    usersAuth(@Session() session: SessionModel, @Req() request: express.Request) {              
        
        return this.sessionSrv.checkPassword(session, request.body.password);
    }
 
    @Get("/list")
    @UseBefore(AdminsAndTeachersOnly)
    usersList(@Session() session: SessionModel, @QueryParam("showStudents") showStudents: boolean, @QueryParam("schoolId") schoolId: number) {      
        if (!this.sessionSrv.isRoot(session)) {
            // Teachers can only access their schoolId
            schoolId = session.user.schoolId;
        }
        return this.userSrv.findBySchoolId(schoolId, showStudents);
    }


    @Post("/save")
    @UseBefore(AdminsAndTeachersOnly)
    async userSave(@Session() session: SessionModel, @Body({validate: true}) user: UserModel, @Res() response: express.Response) {      
        const sessionUser = session.user;
        if (sessionUser.idRole === UserRoles.admin ||
            (sessionUser.schoolId === user.schoolId) ) {
            return this.userSrv.save(user);
        } else {
            return response.status(400).send({msg: "You can only edit users of your schoolId."});
        }
    }

    @Delete("/delete")    
    @UseBefore(AdminsOnly)
    async userDelete(@Session() session: SessionModel, @QueryParam("idUser") idUser: number, @Res() response: express.Response) {              
        const sessionUser = session.user;
        const user = await this.userSrv.findById(idUser);
        
        if (sessionUser.idRole === UserRoles.admin ||
            (sessionUser.schoolId === user.schoolId) ) {
            return this.userSrv.delete(user);
        } else {
            return response.status(400).send({msg: "Admins can only delete users of their schoolId."});
        }
    }
 
}

 