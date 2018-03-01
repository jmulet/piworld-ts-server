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
        return this.UnitRepository.remove(entity);
    }

    async deleteById(idUnit: number) {
        const entity = await this.UnitRepository.findOne({id: idUnit});
        return this.UnitRepository.remove(entity);
    }

    listByIdCourse(idCourse: number) {
        return this.UnitRepository.listByIdCourse(idCourse);
    }
    
    listAssigned(idGroup: number, idUser: number) {
        return this.UnitRepository.listAssigned(idGroup, idUser);
    }

    listCreated(idGroup: number) {
        return this.UnitRepository.listCreated(idGroup);
    }

    listUnitsOnly(idGroup: number) {
        return this.UnitRepository.listUnitsOnly(idGroup);
    }
}