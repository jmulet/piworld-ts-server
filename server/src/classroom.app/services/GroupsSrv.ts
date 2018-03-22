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

    find(idGroup: number, showSoftDeleted?: number) {
        let builder = this.repository.createQueryBuilder("g").where("g.id=:idGroup", {idGroup: idGroup});
        if (showSoftDeleted >=0) {
            builder = builder.andWhere("g.sdr > :role", {role: showSoftDeleted});
         } else {
            builder = builder.andWhere("g.sdr IS NULL")
         }
        return builder.getOne();
    }

    // List all groups associated with a given idCourse
    // By default include the _enrolls leftJoin
    findByIdCourse(idCourse: number, idUserCreator?: number, noEnrolls?: boolean, showSoftDeleted?: number){
        let builder = this.repository.createQueryBuilder("g").where("g.idCourse=:idCourse", {idCourse: idCourse});
        if (!noEnrolls) {
            builder = builder.leftJoinAndSelect("g._enrolls", "e");
        }
        if (idUserCreator) {
            builder = builder.andWhere("g.idUserCreator=:idUserCreator", {idUserCreator: idUserCreator});
        }
        if (showSoftDeleted >=0) {
            builder = builder.andWhere("g.sdr > :role", {role: showSoftDeleted});
         } else {
            builder = builder.andWhere("g.sdr IS NULL")
         }
        return builder.getMany();
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

    delete(entity: GroupsModel) {
        entity.sdd = new Date();
        entity.sdr = entity.sdr || UserRoles.admin;
        return this.repository.save(entity);
    }

    hardDelete(entity: GroupsModel) {
        return this.repository.remove(entity);
    }

    async deleteById(idGroup: number) {
        const entity = await this.repository.findOne({id: idGroup});
        if (entity) {
            return this.delete(entity);            
        } 
        return false;
   }

    async hardDeleteById(idGroup: number) {
         const entity = await this.repository.findOne({id: idGroup});
         return this.repository.remove(entity);            
    }

    releaseSoftDeletes(days: number) {
        return this.repository.createQueryBuilder("e").delete()
        .where("DATEDIFF(NOW(), e.sdd) > :days", { days: days })
        .execute();
    }

    restoreSoftDelete(id?: number) {
        return this.repository.createQueryBuilder("e").update()
            .set({ sdd: null, sdr: null })
            .where("e.sdd IS NOT NULL").andWhere(id ? "e.id=:id" : "1=1", { id: id })
            .execute();
    }
}