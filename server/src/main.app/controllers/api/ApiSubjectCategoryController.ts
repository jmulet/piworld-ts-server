import { Body, Controller, Delete, Get, Param, Post } from 'routing-controllers';
import { Inject } from 'typedi';

import { SubjectCategoryModel } from '../../entities/SubjectCategoryModel';
import { SubjectCategorySrv } from '../../services/SubjectCategorySrv';

 
@Controller("/api/subject/category")
export class ApiSubjectCategoryController {
 
    @Inject()
    subjectCategorySrv: SubjectCategorySrv;
 
    @Get("/list")
    list() {        
        return this.subjectCategorySrv.list();
    }

    @Get("/:id")
    get(@Param("id") id: number) {        
        return this.subjectCategorySrv.findById(id);
    }

    @Post("/")
    save(@Body({required: true}) entity: SubjectCategoryModel) {        
        return this.subjectCategorySrv.save(entity);
    }

    @Delete("/:id")
    delete(@Param("id") id: number) {        
        return this.subjectCategorySrv.deleteById(id);
    }
}
