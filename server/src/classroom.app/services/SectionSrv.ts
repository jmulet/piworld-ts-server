import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';

import { SectionModel } from '../entities/SectionModel'; 


@Service()
export class SectionSrv {
    repository: Repository<SectionModel>;
   
    constructor(){
        this.repository = getRepository(SectionModel); 
    }

    // get by idActivity && idCreator
    public list(idActivity: number, idCreator?: number, idUnit?: number) {
        let obj: any = {idActivity: idActivity};
        if (idCreator) {
            obj.idCreator = idCreator;
        }
        if (idUnit) {
            obj.idUnit = idUnit;
        }
        return this.repository.find(obj);
    }
 
    // Assignment_users are saved by cascade... Specify in AssignmentModel.assigmentUsersModel[]
    public save(entity: SectionModel) {
        return this.repository.save(entity);
    }

    public delete(entity: SectionModel) {
        return this.repository.remove(entity);
    }

    public async deleteById(id: number) {
        const entity = await this.repository.find({id: id});
        return this.repository.remove(entity);
    }
}