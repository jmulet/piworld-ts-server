import { Controller, Get, Post, Body, Put, QueryParam, Delete, Session, Param } from 'routing-controllers';
import { Inject } from 'typedi';

import { SubjectSrv } from '../../services/SubjectSrv';
import { NewsSrv } from '../../services/NewsSrv';
import { NewsModel } from '../../entities/NewsModel';
import { SessionModel } from '../../model/SessionModel';
import { UserRoles } from '../../entities/UserModel';

 
@Controller("/api/news")
export class ApiNewsController {
 
    @Inject()
    newsSrv: NewsSrv;
 
    @Get("/list")
    list(@QueryParam("limit") limit: number, @Session() session: SessionModel) {        
        let idUser = 0;
        if (session.user.idRole !== UserRoles.admin) {
            let idUser = session.user.id;
        }
        return this.newsSrv.list(idUser, limit);
    }

    @Get("/:idNews")
    get(@Param("idNews") idNews: number) {        
        return this.newsSrv.get(idNews);
    }

    @Post("/")
    save(@Body() entity: NewsModel) {        
        return this.newsSrv.save(entity);
    }

    @Put("/:idNews")
    update(@Param("idNews") idNews: number, @Body() entity: NewsModel) {        
        entity.id = idNews;
        return this.newsSrv.save(entity);
    }

    @Delete("/:idNews")
    delete(@Param("idNews") idNews: number) {        
        return this.newsSrv.deleteById(idNews);
    }

    @Post("/ordering")
    saveOrdering(@Body() entities: NewsModel[]) {        
        return this.newsSrv.saveArray(entities);
    }
}
