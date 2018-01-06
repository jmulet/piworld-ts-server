import * as express from 'express';
import { Controller, Get, Render, Req, Res, Session, UseBefore, QueryParam } from 'routing-controllers';
import { Inject } from 'typedi';

import { UserRoles } from '../entities/UserModel';
import { AuthenticatedMdw } from '../middlewares/AuthenticatedMdw';
import { AuthorizedMdw } from '../middlewares/AuthorizedMdw';
import { UserSrv } from '../services/UserSrv';
import { SchoolSrv } from '../services/SchoolSrv';
import { SessionModel } from '../model/SessionModel';
import { SessionSrv } from '../services/SessionSrv';
import { TranslationMdw } from '../middlewares/TranslationMdw';

@Controller("/admin")
@UseBefore(AuthenticatedMdw)
@UseBefore(AuthorizedMdw([UserRoles.admin]))
@UseBefore(TranslationMdw)
export class AdminController {
 
    @Inject()
    userSrv: UserSrv;

    @Inject()
    schoolSrv: SchoolSrv;

    @Inject()
    sessionSrv: SessionSrv;

    @Get("/")
    @Render("admin/home")
    adminHomePage(@Session() session: SessionModel, @Req() request: express.Request, @Res() response: express.Response) {      
        return  {
            user: session.user,
            uopts: session.uopts || {},
            isAdmin: true,
            news: []
        }
    }
}

 