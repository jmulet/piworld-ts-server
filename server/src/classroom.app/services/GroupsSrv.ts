import { Inject, Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { UserRoles } from '../../main.app/entities/UserModel';
import { GroupsModel } from '../entities/GroupsModel';
import { EnrollSrv } from './GroupEnrollSrv';

 
 

@Service()
export class GroupsSrv {
    repository: Repository<GroupsModel>;
   
    @Inject()
    enrollSrv: EnrollSrv;

    constructor(){
        this.repository = getRepository(GroupsModel); 
    }
   
   static fromData(name?: string, year?: number, idCourse?: number) {
        const entity = new GroupsModel();
        entity.name = name;
        entity.year = year;
        entity.idCourse = idCourse;
        return entity;
    }

    find(idGroup: number){
        return this.repository.findOne({id: idGroup});
    }

    findCreated(idCourse: number){
        return this.repository.find({idCourse: idCourse});
    }
 
    save(entity: GroupsModel) {
        //And enroll the creator automagically
        /*
        if (!entity.enrolls) {
            const enroll1 = EnrollSrv.fromData(entity.idCourse, UserRoles.teacher_admin);
            entity.enrolls = [ enroll1 ];
        }
        */
        return this.repository.save(entity);
    }

    del(entity: GroupsModel) {
        return this.repository.remove(entity);
    }

    async deleteById(idGroup: number) {
         const entity = await this.repository.find({id: idGroup});
         return this.repository.remove(entity);            
    }

}