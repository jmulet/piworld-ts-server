import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { UploadModel } from '../../main.app/entities/classroom/UploadModel';


@Service()
export class UploadSrv {
    uploadRepository: Repository<UploadModel>;
   
    constructor(){
        this.uploadRepository = getRepository(UploadModel); 
    }
 
    save(entity: UploadModel) {
        return this.uploadRepository.save(entity);
    }

    delete(entity: UploadModel) {
        return this.uploadRepository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.uploadRepository.find({id: id});
        return this.uploadRepository.remove(entity);
    }

    list(idAssignment: number, idUser?: number) {
 
        let builder = this.uploadRepository.createQueryBuilder("u").where("u.idAssignment=:idAssignment", {idAssignment: idAssignment});
        
        if (idUser) {
            builder = builder.andWhere("u.idUser =:idUser", {idUser: idUser});
        }
        
        return builder.getMany();    
    }
  
}