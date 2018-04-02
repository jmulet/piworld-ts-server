import { Controller, Get, Render, UseBefore, Session } from "routing-controllers";
import { AuthenticatedMdw } from "../../main.app/middlewares/AuthenticatedMdw";
import { SessionModel } from "../../main.app/model/SessionModel";
import { PwHttpServer } from "../../server";
import { Inject } from "typedi";
import { SessionSrv } from "../../main.app/services/SessionSrv";

@Controller("/classroom")
@UseBefore(AuthenticatedMdw)
export class ClassroomController {

    @Inject()
    sessionSrv: SessionSrv;

    @Get("/")
    @Render("classroom")
    async desktopPage(@Session() session: SessionModel) {
        
        const applications = PwHttpServer.getInstance().getInstalledApps();
        const apps = applications.map( (e)=> e.config);
         
        return  {
            user: session.user,
            uopts: session.uopts || {},
            isAdmin: this.sessionSrv.isAdmin(session),             
            applications: apps,
            rmWhitespace: true
        }               
    }

}