import { Controller, Get, Render, Session, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { AuthenticatedMdw } from '../middlewares/AuthenticatedMdw';
import { SessionModel } from '../model/SessionModel';
import { NewsSrv } from '../services/NewsSrv';
import { SessionSrv } from '../services/SessionSrv';

@Controller()
@UseBefore(AuthenticatedMdw)
export class DesktopController {
 
    @Inject()
    sessionSrv: SessionSrv;

    @Inject()
    newsSrv: NewsSrv;

    @Get("/desktop.htm")
    @Render("desktop")
    async desktopPage(@Session() session: SessionModel) {
        
        const news = await this.newsSrv.list();
        return  {
            user: session.user,
            uopts: session.uopts || {},
            isAdmin: this.sessionSrv.isAdmin(session),
            news: news
        }
                    
    }

}

 