import { Controller, Get, Render, UseBefore } from "routing-controllers";
import { AuthenticatedMdw } from "../../main.app/middlewares/AuthenticatedMdw";

@Controller("/classroom/admin")
@UseBefore(AuthenticatedMdw)
export class AdminTasksController {

    @Get("/groups")
    @Render("admin/groups")
    adminGroups() {        
    }

}