import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { ActivityModel } from '../../main.app/entities/classroom/ActivityModel';


@EntityRepository(ActivityModel)
export class ActivityRepository extends Repository<ActivityModel> {
       
    listAll() {
        return this.find();
    }

    search(text: string, limit?: number, offset?: number, showSoftDeleted?: number) {
        let builder = this.createQueryBuilder("activity")
        .where("activity LIKE :text")
        .orWhere("createdBy LIKE :text")
        .orWhere("description LIKE :text")
        .setParameters({text: "%" + text+ "%"});

        if (limit) {
            builder = builder.limit(limit);
        }
        if (offset) {
            builder = builder.offset(offset);
        }
        if (showSoftDeleted >=0) {
            builder = builder.andWhere("activity.sdr > :role", {role: showSoftDeleted});
         } else {
            builder = builder.andWhere("activity.sdr IS NULL")
         }

        builder = builder.orderBy("activity.id", "DESC");
        
        return builder.getMany();
    }
 
   
}