import { Controller, Get, Render, Session, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';
import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { SessionModel } from '../../model/SessionModel';

@Controller("/api")
@UseBefore(AuthenticatedMdw)
export class UsersController {
 
    @Get("/user/groups")
    userGroups(@Session() session: SessionModel) {        
        return session.enrolls.map( e => e.group );
    }
    
}
