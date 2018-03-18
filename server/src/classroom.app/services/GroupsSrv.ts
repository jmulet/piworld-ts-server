import { Inject, Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { UserRoles } from '../../main.app/entities/UserModel';
import { GroupsModel } from '../../main.app/entities/classroom/GroupsModel';
import { EnrollSrv } from './GroupEnrollSrv';

 
 

@Service()
export class GroupsSrv {
    repository: Repository<GroupsModel>;
   
    @Inject()
    enrollSrv: EnrollSrv;

    constructor(){
        this.repository = getRepository(GroupsModel); 
    }
   
   static fromData(name?: string, year?: number, idUserCreator?: number) {
        const entity = new GroupsModel();
        entity.name = name; 
        entity.idUserCreator = idUserCreator;
        return entity;
    }

    find(idGroup: number){
        return this.repository.findOne({id: idGroup});
    }

    // List all groups associated with a given idCourse
    // By default include the _enrolls leftJoin
    findByIdCourse(idCourse: number, noEnrolls?: boolean){
        if (noEnrolls) {
            return this.repository.find({idCourse: idCourse})
        } else {
            return this.repository.createQueryBuilder("g").leftJoinAndSelect("g._enrolls", "e")
                .where("g.idCourse=:idCourse", {idCourse: idCourse}).getMany();
        }
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