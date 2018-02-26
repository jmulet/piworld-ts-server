import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { UnitModel } from '../entities/UnitModel';


@EntityRepository(UnitModel)
export class UnitRepository extends Repository<UnitModel> {
       
    listByIdGroup(idGroup) {
        return this.find({idGroup: idGroup});
    }

    // Load units with associated assignments visible to a given user
    listAssigned(idGroup: number, idUser: number) {
        return  this.createQueryBuilder("unit")
        .innerJoinAndSelect("unit.assignments", "assignment")
        .leftJoin("assignment.assignmentUsers", "assignmentUsers")
        .where("unit.idGroup=:idGroup")
        .andWhere("unit.visible=1")
        .andWhere("unit.applyToAll=1")
        .setParameters({idGroup: idGroup})
        .orderBy("unit.order", "ASC")
        .getMany();
    } 

    // Load units with associated assignments created by the teacher
    listCreated(idGroup: number) {
        return  this.createQueryBuilder("unit")
        .innerJoinAndSelect("unit.assignments", "assignment")
        .leftJoinAndSelect("assignment.assignmentUsers", "assignmentUsers")
        .where("unit.idGroup=:idGroup")
        .setParameters({idGroup: idGroup})
        .orderBy("unit.order", "ASC")
        .getMany();
    }
 
}