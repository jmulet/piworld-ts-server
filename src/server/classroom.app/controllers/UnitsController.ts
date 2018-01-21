import { Controller, Get, Render } from "routing-controllers";

@Controller("/classroom")
export class UnitsController {

    @Get("/")
    @Render("units")
    units() {
        
    }

}