import { Service } from 'typedi';
import { Repository, getCustomRepository } from 'typeorm';

import { ActivityModel } from '../entities/ActivityModel';
import { ActivityRepository } from '../repositories/ActivityRepository';


@Service()
export class ActivitySrv {
    activityRepository: ActivityRepository;
   
    constructor(){
        this.activityRepository = getCustomRepository(ActivityRepository); 
    }

    search(text: string, limit?: number, offset?: number) {
        return this.activityRepository.search(text, limit, offset);
    }

    save(entity: ActivityModel) {
        return this.activityRepository.save(entity);
    }

    delete(entity: ActivityModel) {
        return this.activityRepository.remove(entity);
    }

    async deleteById(id: number) {
        await this.activityRepository.delete(id);
        return true;
    }
}