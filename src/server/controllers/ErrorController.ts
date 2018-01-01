import { Get, JsonController, Render } from 'routing-controllers';

@JsonController()
export class ErrorController {
 
    @Get("/404")
    @Render("errors/404.htm")
    error404(){        
    }

    @Get("/403")
    @Render("errors/403.htm")
    error403(){        
    }

}


