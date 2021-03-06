
import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { RatingModel } from '../../main.app/entities/classroom/RatingModel';


@Service()
export class RatingSrv {
    ratingRepository: Repository<RatingModel>;
   
    constructor(){
        this.ratingRepository = getRepository(RatingModel); 
    }
 
    save(entity: RatingModel) {
        return this.ratingRepository.save(entity);
    }

    delete(entity: RatingModel) {
        return this.ratingRepository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.ratingRepository.find({id: id});
        return this.ratingRepository.remove(entity);
    }

    ratingByActivityAndUser(idActivity: number, idUser: number) {
 
        return this.ratingRepository.createQueryBuilder("r").where("r.idActivity=:idActivity", {idActivity: idActivity})
            .andWhere("r.idUser =:idUser", {idUser: idUser}).getOne();
            
    }
 
    ratingByActivity(idActivity: number) {
 
        return this.ratingRepository.createQueryBuilder("r").select("r.idActivity, average(r.score) as score, average(r.vscore) as vscore").
            where("r.idActivity=:idActivity", {idActivity: idActivity}).groupBy("r.idActivity").getRawOne();
            
    }
 
}