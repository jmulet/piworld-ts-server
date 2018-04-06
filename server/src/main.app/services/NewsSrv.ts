import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { NewsModel } from '../entities/NewsModel';


@Service()
export class NewsSrv {
    newsRepository: Repository<NewsModel>;
   
    constructor(){
        this.newsRepository = getRepository(NewsModel); 
    }

    public get(id: number) {
        return this.newsRepository.findOne({id: id});
    }

    public list(idUser: number, limit: number = 10) {
        let builder = this.newsRepository.createQueryBuilder("n")
                      .where("(n.expires IS NULL OR n.expires > NOW())")
        if (idUser) {
            builder = builder.andWhere("n.idUserCreator=:idUser", {idUser: idUser})
        }
    
        return builder.limit(limit).orderBy("n.id", "DESC").getMany();
    }

    public save(entity: NewsModel) {
        return this.newsRepository.save(entity);
    }

    public saveArray(entities: NewsModel[]) {
        return this.newsRepository.save(entities);
    }

    public delete(entity: NewsModel) {
        return this.newsRepository.remove(entity);
    }

    public async deleteById(id: number) {
        const entity = await this.newsRepository.find({id: id});
        if (entity) {
            return this.newsRepository.remove(entity);
        } 
        return false;
    }
}