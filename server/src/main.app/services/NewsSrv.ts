import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { NewsModel } from '../entities/NewsModel';


@Service()
export class NewsSrv {
    newsRepository: Repository<NewsModel>;
   
    constructor(){
        this.newsRepository = getRepository(NewsModel); 
    }

    public list(limit: number = 10) {
        return this.newsRepository.createQueryBuilder("n").where("n.expires IS NULL").orWhere("n.expires > NOW()").limit(limit).orderBy("n.id", "DESC").getMany();
    }

    public save(entity: NewsModel) {
        return this.newsRepository.save(entity);
    }

    public delete(entity: NewsModel) {
        return this.newsRepository.remove(entity);
    }

    public async deleteById(id: number) {
        const entity = await this.newsRepository.find({id: id});
        return this.newsRepository.remove(entity);
    }
}