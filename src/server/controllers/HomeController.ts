import * as express from 'express';
import { Controller, Get, Render, Req, Res, Session, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { UserRoles } from '../entities/UserModel';
import { AuthenticatedMdw } from '../middlewares/AuthenticatedMdw';
import { AuthorizedMdw } from '../middlewares/AuthorizedMdw';
import { LoginsSrv } from '../services/LoginsSrv';

@Controller()
@UseBefore(AuthenticatedMdw)
export class HomeController {
 
    @Inject()
    loginsSrv: LoginsSrv;

    @Get("/home.htm")
    @Render("home")
    async homePage(@Session() session: any, @Req() request: express.Request, @Res() response: express.Response) {
        
        const obj =  {
            pageTitle: "You are logged in",
            fullname: "",
            idRole: 200
        }
 

        console.log ( await this.loginsSrv.listByUsername(session.user.username) );


        obj.fullname = session.user.fullname;
        obj.idRole = session.user.idRole;
        //response.render("home", obj);
        return obj;
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

 