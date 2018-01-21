import { Controller, Get, Render } from "routing-controllers";

@Controller("/classroom/admin")
export class AdminTasks {

    @Get("/groups")
    @Render("admin/groups")
    adminGroups() {        
    }

}