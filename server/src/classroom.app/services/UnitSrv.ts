import { Service } from 'typedi';
import { Repository, getCustomRepository } from 'typeorm';

import { UnitModel } from '../entities/UnitModel';
import { UnitRepository } from '../repositories/UnitRepository';


@Service()
export class UnitSrv {
    UnitRepository: UnitRepository;
   
    constructor(){
        this.UnitRepository = getCustomRepository(UnitRepository); 
    }
 
    save(entity: UnitModel) {
        return this.UnitRepository.save(entity);
    }

    delete(entity: UnitModel) {
        return this.UnitRepository.delete(entity);
    }

    async deleteById(id: number) {
        const entity = await this.UnitRepository.findOneById(id);
        return this.UnitRepository.delete(entity);
    }

    listByIdGroup(idGroup: number) {
        return this.UnitRepository.listByIdGroup(idGroup);
    }
    
    listAssigned(idGroup: number, idUser: number) {
        return this.UnitRepository.listAssigned(idGroup, idUser);
    }

    listCreated(idGroup: number) {
        return this.UnitRepository.listCreated(idGroup);
    }
}