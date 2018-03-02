import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { ChallengesModel } from '../entities';


@Service()
export class ChallengeSrv {
    challengesRepository: Repository<ChallengesModel>;
   
    constructor(){
        this.challengesRepository = getRepository(ChallengesModel); 
    }
 
    save(entity: ChallengesModel) {
        return this.challengesRepository.save(entity);
    }

    delete(entity: ChallengesModel) {
        return this.challengesRepository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.challengesRepository.find({id: id});
        return this.challengesRepository.remove(entity);
    }

    list(level: string, day: Date, idUser?: number) {
 
        let builder = this.challengesRepository.createQueryBuilder("c").innerJoinAndSelect("c._challengeUsers", "cu")
            .where("c.level=:level", {level: level}).andWhere("c.day=:day", {day: day});
        
        if (idUser) {
            builder = builder.andWhere("cu.idUser=:idUser", {idUser: idUser});
        }
        
        return builder.getMany();
    }
 
}