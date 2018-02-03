import { Controller, Get, Render, UseBefore } from "routing-controllers";
import { AuthenticatedMdw } from "../../main.app/middlewares/AuthenticatedMdw";

@Controller("/classroom")
@UseBefore(AuthenticatedMdw)
export class UnitsController {

    @Get("/")
    @Render("units")
    units() {
        
    }

}