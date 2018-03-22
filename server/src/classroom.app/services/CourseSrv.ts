import { Service, Inject } from 'typedi';
import { Repository, getRepository } from 'typeorm';

import { CourseModel } from '../../main.app/entities/classroom/CourseModel';
import { GroupsSrv } from './GroupsSrv'; 
import { GroupsModel } from '../../main.app/entities/classroom/GroupsModel';
import { SubjectModel } from '../../main.app/entities/SubjectModel';
import { EnrollSrv } from './GroupEnrollSrv';
import { UserRoles } from '../../main.app/entities/UserModel';

@Service()
export class CourseSrv {

    repository: Repository<CourseModel>;

    @Inject()
    groupsSrv: GroupsSrv

    constructor() {
        this.repository = getRepository(CourseModel);
    }

    async save(entity: CourseModel) {
        // Before course creation, create a buildin group which holds the creator itself
        if (!entity.id && !entity._courseGroups) {
            const group = GroupsSrv.fromData(entity.name + " teachers", entity.year, entity.idUserCreator);     
            // hold the creator in this group
            const enroll = EnrollSrv.fromData(entity.idUserCreator, UserRoles.teacher_admin);
            group._enrolls = [ enroll ];        
            entity._courseGroups = [group];
        } 
        return this.repository.save(entity);
    }

    delete(entity: CourseModel) {
        entity.sdd = new Date();
        entity.sdr = entity.sdr || UserRoles.admin;
        return this.repository.save(entity);
    }

    hardDelete(entity: CourseModel) {
        return this.repository.remove(entity);
    }

    async deleteById(idUnit: number) {
        const entity = await this.repository.findOne({ id: idUnit });
        if (entity) {
            return this.delete(entity);
        }
        return false;
    }

    async hardDeleteById(idUnit: number) {
        const entity = await this.repository.findOne({ id: idUnit });
        return this.repository.remove(entity);
    }
    
    list(idUser: number, created?: boolean, showSoftDeleted?: number) {
        let builder = this.repository.createQueryBuilder("c");
        if (created) {
            builder = builder.innerJoinAndSelect("c._subject", "s")
            .where("c.idUserCreator=:idUser", {idUser: idUser});
        } else {
            // List courses in which some group contains the current idUser: Must select distinct
            builder = builder.innerJoin("c._courseGroups", "g")
            .innerJoin("g._enrolls", "e")
            .where("e.idUser=:idUser", {idUser: idUser})
            .groupBy("c.id")
        }        

        if (showSoftDeleted >= 0) {
            builder = builder.andWhere("c.sdr >= :role", {role: showSoftDeleted});   
        }
        else {
            builder = builder.andWhere("c.sdr IS NULL");
        }
        return builder.getMany();
    }

    findById(idCourse: number, showSoftDeleted?: number) {
        let builder = this.repository.createQueryBuilder("c").where({id: idCourse});
        if (showSoftDeleted >= 0) {
            builder = builder.andWhere("c.sdr >= :role", {role: showSoftDeleted});   
        }
        else {
            builder = builder.andWhere("c.sdr IS NULL");
        }
        return builder.getOne();
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