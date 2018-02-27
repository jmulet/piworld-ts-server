import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { VisualizationModel } from '../entities';


@Service()
export class VisualizationSrv {
    visualizationRepository: Repository<VisualizationModel>;
   
    constructor(){
        this.visualizationRepository = getRepository(VisualizationModel); 
    }
 
    save(entity: VisualizationModel) {
        return this.visualizationRepository.save(entity);
    }

    delete(entity: VisualizationModel) {
        return this.visualizationRepository.delete(entity);
    }

    async deleteById(id: number) {
        const entity = await this.visualizationRepository.findOneById(id);
        return this.visualizationRepository.delete(entity);
    }

    list(idAssignment: number, idUser?: number) {
 
        let builder = this.visualizationRepository.createQueryBuilder("v").innerJoinAndSelect("v.visualizationUsers", "vq")
        .where("v.idAssignment=:idAssignment", {idAssignment: idAssignment});
        
        if (idUser) {
            builder = builder.innerJoin("v.login", "l").andWhere("l.idUser =:idUser", {idUser: idUser});
        }
        
        return builder.getMany();    
    }
  
}