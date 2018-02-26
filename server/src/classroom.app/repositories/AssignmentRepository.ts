import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { AssignmentModel } from '../entities/AssignmentModel';


@EntityRepository(AssignmentModel)
export class AssignmentRepository extends Repository<AssignmentModel> {
       
    public listByIdUnit(idUnit) {
        return this.find({idUnit: idUnit});
    }
 
    
}