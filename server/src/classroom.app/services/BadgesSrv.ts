import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { BadgesModel } from '../../main.app/entities/classroom/BadgesModel';


@Service()
export class BadgesSrv {
    badgesRepository: Repository<BadgesModel>;
   
    constructor(){
        this.badgesRepository = getRepository(BadgesModel); 
    }
 
    save(entity: BadgesModel) {
        return this.badgesRepository.save(entity);
    }

    delete(entity: BadgesModel) {
        return this.badgesRepository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.badgesRepository.find({id: id});
        return this.badgesRepository.remove(entity);
    }

    list(idGroup: number, idUser: number, fromDate?: Date, toDate?: Date, fromType?: number, toType?: number) {

        let params: any = {idUser: idUser, idGroup: idGroup};
        let builder = this.badgesRepository.createQueryBuilder("b").select().where("b.idUser=:idUser")
            .andWhere("b.idGroup=:idGroup");

        if (fromDate) {
            params.fromDate = fromDate;
            builder = builder.andWhere("b.day >=:fromDate");
        }
        if (toDate) {
            params.toDate = toDate;
            builder = builder.andWhere("b.day <=:toDate");
        }
        if (fromType) {
            params.fromType = fromType;
            builder = builder.andWhere("b.type >=:fromType");
        }
        if (toType) {
            params.toType = toType;
            builder = builder.andWhere("b.type <=:toType");
        }

        return builder.setParameters(params).getMany();
    }
 
}