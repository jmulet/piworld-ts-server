import { Service } from 'typedi';
import { Repository, getCustomRepository } from 'typeorm';

import { AssignmentModel } from '../entities/AssignmentModel';
import { AssignmentRepository } from '../repositories/AssignmentRepository';


@Service()
export class AssignmentSrv {
    AssignmentRepository: AssignmentRepository;
   
    constructor(){
        this.AssignmentRepository = getCustomRepository(AssignmentRepository); 
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
        return this.AssignmentRepository.find(obj);
    }
 
    // Assignment_users are saved by cascade... Specify in AssignmentModel.assigmentUsersModel[]
    public save(entity: AssignmentModel) {
        return this.AssignmentRepository.save(entity);
    }

    public delete(entity: AssignmentModel) {
        return this.AssignmentRepository.remove(entity);
    }

    public async deleteById(id: number) {
        const entity = await this.AssignmentRepository.find({id: id});
        return this.AssignmentRepository.remove(entity);
    }
}