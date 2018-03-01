import { Service, Inject } from 'typedi';
import { Repository, getRepository } from 'typeorm';

import { CourseModel } from '../entities/CourseModel';
import { GroupsSrv } from '../../main.app/services/GroupsSrv';
import { CourseGroupsModel } from '../entities';

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
        if (!entity.id && !entity.courseGroups) {
            const group = GroupsSrv.fromData(entity.name + " group", entity.year, entity.idUserCreator);
            await this.groupsSrv.save(group);

            const cg = new CourseGroupsModel();
            cg.idGroup = group.id;
            entity.courseGroups = [cg];
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