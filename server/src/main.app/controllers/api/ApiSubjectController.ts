import { Controller, Delete, Get, Param, Post, Body } from 'routing-controllers';
import { Inject } from 'typedi';

import { SubjectModel } from '../../entities/SubjectModel';
import { SubjectSrv } from '../../services/SubjectSrv';

 
@Controller("/api/subject")
export class ApiSubjectController {
 
    @Inject()
    subjectSrv: SubjectSrv;
 
    @Get("/list")
    list() {        
        return this.subjectSrv.list();
    }

    @Get("/:idSubject")
    get(@Param("idSubject") idSubject: number) {        
        return this.subjectSrv.findById(idSubject);
    }

    @Post("/")
    save(@Body({required: true}) entity: SubjectModel) {        
        return this.subjectSrv.save(entity);
    }

    @Delete("/:idSubject")
    delete(@Param("idSubject") idSubject: number) {        
        return this.subjectSrv.deleteById(idSubject);
    }
}
