import { Controller, Get } from 'routing-controllers';
import { Inject } from 'typedi';

import { SubjectSrv } from '../../services/SubjectSrv';

 
@Controller("/api/subject")
export class ApiGroupsController {
 
    @Inject()
    subjectSrv: SubjectSrv;
 
    @Get("/list")
    list() {        
        return this.subjectSrv.list();
    }
}
