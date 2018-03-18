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

    del(entity: CourseModel) {
        return this.repository.remove(entity);
    }

    async deleteById(idUnit: number) {
        const entity = await this.repository.findOne({ id: idUnit });
        return this.repository.remove(entity);
    }
    
    list(idUser: number, created?: boolean) {
        if (created) {
            return this.repository.createQueryBuilder("c").innerJoinAndSelect("c._subject", "s")
            .where("c.idUserCreator=:idUser", {idUser: idUser}).getMany();
        } else {
            // List courses in which some group contains the current idUser: Must select distinct
            return this.repository.createQueryBuilder("c")
            .innerJoin("c._courseGroups", "g")
            .innerJoin("g._enrolls", "e")
            .where("e.idUser=:idUser", {idUser: idUser})
            .groupBy("c.id")
            .getMany();
        }        
    }

    findById(idCourse: number) {
        return this.repository.findOne({id: idCourse});
    }
    
}