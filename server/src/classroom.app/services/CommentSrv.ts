
import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { CommentModel } from '../entities';


@Service()
export class CommentSrv {
    commentRepository: Repository<CommentModel>;
   
    constructor(){
        this.commentRepository = getRepository(CommentModel); 
    }
 
    save(entity: CommentModel) {
        return this.commentRepository.save(entity);
    }

    delete(entity: CommentModel) {
        return this.commentRepository.delete(entity);
    }

    async deleteById(id: number) {
        const entity = await this.commentRepository.findOneById(id);
        return this.commentRepository.delete(entity);
    }

    list(idActivity: number, idUser?: number, fromDate?: Date, toDate?: Date) {

       
        let builder = this.commentRepository.createQueryBuilder("c").where("c.idActivity=:idActivity", {idActivity: idActivity})
            
        if (idUser) {
            builder = builder.andWhere("c.idUser =:idUser", {idUser: idUser});
        }
        if (fromDate) {
            builder = builder.andWhere("c.day <=:fromDate", {fromDate: fromDate});
        }        
        if (toDate) {
            builder = builder.andWhere("c.day <=:toDate", {toDate: toDate});
        }
        
        return builder.getMany();
    }
 
}