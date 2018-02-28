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

    public search(text: string, limit?: number, offset?: number) {
        return this.activityRepository.search(text, limit, offset);
    }

    public save(entity: ActivityModel) {
        return this.activityRepository.save(entity);
    }

    public delete(entity: ActivityModel) {
        return this.activityRepository.delete(entity);
    }

    public async deleteById(id: number) {
        return this.activityRepository.deleteById(id);
    }
}