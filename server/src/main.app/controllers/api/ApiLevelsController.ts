import { Controller, Get, QueryParam, Post, Delete, Param, Body } from 'routing-controllers';
import { Inject } from 'typedi';

import { SubjectSrv } from '../../services/SubjectSrv';
import { LevelsSrv } from '../../services/LevelsSrv';
import { LevelsModel } from '../../entities/LevelsModel';

 
@Controller("/api/levels")
export class ApiLevelsController {
 
    @Inject()
    levelsSrv: LevelsSrv;
 
    @Get("/get/:idLevel")
    get(@Param("idLevel") idLevel: number) {        
        return this.levelsSrv.findById(idLevel);
    }

    @Get("/list")
    list(@QueryParam("level") level: number, @QueryParam("studies") studies: string ) {        
        return this.levelsSrv.list(level, studies);
    }

    @Post("/")
    save(@Body({required: true}) entity: LevelsModel) {        
        return this.levelsSrv.save(entity);
    }

    @Delete("/:idLevel")
    delete(@Param("idLevel") idLevel: number) {        
        return this.levelsSrv.deleteById(idLevel);
    }
}