import { BadRequestError, Body, Controller, Delete, Get, Param, Post, Session, BodyParam } from 'routing-controllers';
import { Inject } from 'typedi';

import { FamousEqnModel } from '../../entities/FamousEqnModel';
import { FamousQuoteModel } from '../../entities/FamousQuoteModel';
import { FamousInterface, FamousSrv } from '../../services/FamousSrv';
import { SessionModel } from '../../model/SessionModel';

 
/**
 * :type Pathparam can be equation or quote
 */ 
@Controller("/api/famous")
export class ApiFamousController {
 
    @Inject()
    famousSrv: FamousSrv;
 
    @Get("/:type/list")
    list(@Param("type") type: string, @Session() session: SessionModel) {        
        const srv: FamousInterface<any> = this.famousSrv[type];
        if (srv) {
            const idUser = session.user.id;
            return srv.list(idUser);
        } else { 
            return new BadRequestError("Unknown type " + type + "in famous controller");
        }
    }

    @Get("/:type/get/:id")
    get(@Param("type") type: string, @Param("id") id: number) {        
        const srv: FamousInterface<any> = this.famousSrv[type];
        if (srv) {
            return srv.findById(id);
        } else { 
            return new BadRequestError("Unknown type " + type + "in famous controller");
        }
    }

    @Post("/equation")
    saveEquation(@Body({validate: true, required: true}) entity: FamousEqnModel) {        
        return this.famousSrv.equation.save(entity);
    }

    @Post("/quote")
    saveQuote(@Body({validate: true, required: true}) entity: FamousQuoteModel) {        
        return this.famousSrv.quote.save(entity);
    }

    @Post("/:type/import")
    massiveImport(@Param("type") type: string, @Body({required: true}) model: any, @Session() session: SessionModel) {        
        const srv: FamousInterface<any> = this.famousSrv[type];
        if (srv) {
            console.log("text to parse", model.text);
            const list = srv.parseImport(model.text, session.user.id);
            console.log("parsed list", list);
            return srv.saveArray(list);
        } else { 
            return new BadRequestError("Unknown type " + type + "in famous controller");
        }
    }
 
    @Delete("/:type/:id")
    delete(@Param("type") type: string, @Param("id") id: number) {        
        const srv: FamousInterface<any> = this.famousSrv[type];
        if (srv) {
            return srv.deleteById(id);
        } else { 
            return new BadRequestError("Unknown type " + type + "in famous controller");
        }
    }

 
}
