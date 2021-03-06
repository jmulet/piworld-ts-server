import { Service } from 'typedi';
import { Repository, getCustomRepository } from 'typeorm';

import { ActivityModel, JSONi18n } from '../../main.app/entities/classroom/ActivityModel';
import { ActivityRepository } from '../repositories/ActivityRepository';
import { UserRoles } from '../../main.app/entities/UserModel';


@Service()
export class ActivitySrv {
    
    static fromData(levels: string, idSubject: number, activity: string, activityType: string, share: number, createdBy: string): ActivityModel {
        const entity = new ActivityModel();
        entity.levels = (levels || "").split(",");
        entity.idSubject = idSubject;
        entity.activity = {ca: activity, es: activity, en: activity};
        entity.description = entity.activity;
        entity.activityType = activityType;
        entity.share = share;
        entity.createdBy = createdBy;
        return entity;
    }
    activityRepository: ActivityRepository;

    constructor() {
        this.activityRepository = getCustomRepository(ActivityRepository);
    }

    search(text: string, limit?: number, offset?: number) {
        return this.activityRepository.search(text, limit, offset);
    }

    save(entity: ActivityModel) {
        return this.activityRepository.save(entity);
    }

    delete(entity: ActivityModel) {
        entity.sdd = new Date();
        entity.sdr = entity.sdr || UserRoles.admin;
        return this.activityRepository.save(entity);
    }

    hardDelete(entity: ActivityModel) {
        return this.activityRepository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.activityRepository.findOne({ id: id });
        if (entity) {
            return this.delete(entity);
        }
        return false;
    }

    async hardDeleteById(id: number) {
        const entity = await this.activityRepository.findOne({ id: id });
        return this.activityRepository.remove(entity);
    }

    releaseSoftDeletes(days: number) {
        return this.activityRepository.createQueryBuilder("e").delete()
            .where("DATEDIFF(NOW(), e.sdd) > :days", { days: days })
            .execute();
    }

    restoreSoftDelete(id?: number) {
        return this.activityRepository.createQueryBuilder("e").update()
            .set({ sdd: null, sdr: null })
            .where("e.sdd IS NOT NULL").andWhere(id ? "e.id=:id" : "1=1", { id: id })
            .execute();
    }
}