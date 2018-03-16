
import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { CommentModel } from '../../main.app/entities/classroom/CommentModel';


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
        return this.commentRepository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.commentRepository.find({id: id});
        return this.commentRepository.remove(entity);
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