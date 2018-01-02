import { Get, JsonController, Render } from 'routing-controllers';

@JsonController()
export class ErrorController {
 
    @Get("/404")
    @Render("errors/404")
    error404(){        
    }

    @Get("/403")
    @Render("errors/403")
    error403(){        
    }

}


