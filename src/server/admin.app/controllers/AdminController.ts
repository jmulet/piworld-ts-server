import * as express from 'express';
import { Controller, Get, Render, Req, Res, Session, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { UserRoles } from '../../main.app/entities/UserModel';
import { AuthenticatedMdw } from '../../main.app/middlewares/AuthenticatedMdw';
import { AuthorizedMdw } from '../../main.app/middlewares/AuthorizedMdw';
import { TranslationMdw } from '../../main.app/middlewares/TranslationMdw';
import { SessionModel } from '../../main.app/model/SessionModel';
import { SchoolSrv } from '../../main.app/services/SchoolSrv';
import { SessionSrv } from '../../main.app/services/SessionSrv';
import { UserSrv } from '../../main.app/services/UserSrv';
import { PwHttpServer } from '../../server';

@Controller("/admin")
@UseBefore(AuthenticatedMdw)
@UseBefore(AuthorizedMdw([UserRoles.admin, ...UserRoles.TEACHERS]))
@UseBefore(TranslationMdw)
export class AdminController {
 
    @Inject()
    userSrv: UserSrv;

    @Inject()
    schoolSrv: SchoolSrv;

    @Inject()
    sessionSrv: SessionSrv;

    @Get("/")
    @Render("admin")
    adminHomePage(@Session() session: SessionModel, @Req() request: express.Request, @Res() response: express.Response) {      

        // Gather all admin tasks installed by the diferent apps
        const adminTasks = PwHttpServer.getInstance().getAdminTasks();
        console.log(adminTasks);
        const idRole = session.user.idRole;
        // Filter this admin tasks according to the current role
        const filteredAdminTasks = [];
        adminTasks.forEach( at => {
            let at2 = Object.assign({}, at);
            at2.tasks = at2.tasks.filter(t => {
                return t.roles.indexOf(idRole) >= 0;
            }); 
            if (at2.tasks.length) {
                filteredAdminTasks.push(at2);
            }
        });
        console.log(JSON.stringify(filteredAdminTasks));

        return  {
            user: session.user,
            uopts: session.uopts || {},
            isAdmin: true,
            news: [],
            adminTasks: filteredAdminTasks
        }
    }
}

 