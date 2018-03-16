import { Service, Inject } from 'typedi';
import { Repository, getRepository } from 'typeorm';

import { CourseModel } from '../../main.app/entities/classroom/CourseModel';
import { GroupsSrv } from './GroupsSrv'; 
import { GroupsModel } from '../../main.app/entities/classroom/GroupsModel';

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
}