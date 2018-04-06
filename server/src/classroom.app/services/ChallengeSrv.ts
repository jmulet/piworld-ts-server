import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { ChallengesModel } from '../../main.app/entities/classroom/ChallengesModel';
import { ChallengesQuizzModel } from '../../main.app/entities/classroom/ChallengesQuizzModel';


@Service()
export class ChallengeSrv {
    challengesRepository: Repository<ChallengesModel>;
    challengesQuizzRepository: Repository<ChallengesQuizzModel>;
   
    constructor(){
        this.challengesRepository = getRepository(ChallengesModel); 
    }
 
    save(entity: ChallengesModel) {
        return this.challengesRepository.save(entity);
    }

    saveQuizz(entity: ChallengesQuizzModel) {
        return this.challengesQuizzRepository.save(entity);
    }

    delete(entity: ChallengesModel) {
        return this.challengesRepository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.challengesRepository.find({id: id});
        return this.challengesRepository.remove(entity);
    }

    list(level: string, day: Date, idUser?: number) {
 
        let builder = this.challengesRepository.createQueryBuilder("c").leftJoinAndSelect("c._challengeUsers", "cu")
            .leftJoinAndSelect("cu._user", "cuu").where("1=1");
        if (level) {
            builder = builder.andWhere("c.level=:level", {level: level});
        }
        if (day) {
            builder = builder.andWhere("c.fromDay<=:day", {day: day}).andWhere("c.toDay>=:day", {day: day});
        }
        if (idUser) {
            builder = builder.andWhere("cu.idUser=:idUser", {idUser: idUser});
        }
        
        return builder.getMany();
    }
 
}