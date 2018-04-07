import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { LevelsModel } from '../entities/LevelsModel';
import { TermsModel } from '../entities/TermsModel';
 
@Service()
export class LevelsSrv {
    repository: Repository<LevelsModel>;

    constructor() {
        this.repository = getRepository(LevelsModel);
    }
 
    findById(id: number) {
        return this.repository.findOne({id: id});
    }

    list(level?: number, studies?: string) {
        let builder = this.repository.createQueryBuilder("l").where("1=1");
        if (level != null) {
            builder = builder.andWhere("l.level = :level", {level: level});
        }
        if (studies != null) {
            builder = builder.andWhere("l.studies = :studies", {studies: studies});
        }
        return builder.orderBy("l.studies", "ASC").addOrderBy("l.level", "ASC").getMany();
    }

    save(entity: LevelsModel){
        return this.repository.save(entity);
    }
 
    delete(entity: LevelsModel) {
      return this.repository.remove(entity);
    }

    deleteById(id: number) {
        return this.repository.delete(id);
    }
 
}