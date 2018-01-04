import * as express from 'express';
import { Controller, Get, Render, Req, Res, Session, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { UserRoles } from '../entities/UserModel';
import { AuthenticatedMdw } from '../middlewares/AuthenticatedMdw';
import { AuthorizedMdw } from '../middlewares/AuthorizedMdw';
import { LoginsSrv } from '../services/LoginsSrv';
import { TranslationMdw } from '../middlewares/TranslationMdw';

@Controller()
@UseBefore(AuthenticatedMdw)
export class HomeController {
 
    @Inject()
    loginsSrv: LoginsSrv;

    @Get("/home.htm")
    @Render("home")
    @UseBefore(TranslationMdw)
    homePage(@Session() session: any, @Req() request: express.Request, @Res() response: express.Response) {        
        return {
            fullname: session.user.fullname,
            idRole: session.user.idRole
        };
    }

    @Get("/admin.htm")
    @UseBefore(AuthorizedMdw([UserRoles.teacher_admin, UserRoles.admin]))
    adminPage(@Session() session: any, @Req() request: express.Request, @Res() response: express.Response) {
        
        console.log(session);

        const obj =  {
            pageTitle: "Supersecret page",
            fullname: "",
            idRole: 200
        }
        response.render("admin/admin", obj);
        //Important return the response; otherwise a Can't set headers error occurs
        return response;
    }

}

 