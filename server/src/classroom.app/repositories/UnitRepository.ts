import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { UnitModel } from '../../main.app/entities/classroom/UnitModel';


@EntityRepository(UnitModel)
export class UnitRepository extends Repository<UnitModel> {
    
    saveList(entities: UnitModel[]) {
        return this.save(entities);
    }

    listByIdCourse(idCourse) {
        return this.find({idCourse: idCourse});
    }

    // Load units with associated assignments visible to a given user
    listAssigned(idCourse: number, idUser: number) {
        return  this.createQueryBuilder("unit")
        .leftJoinAndSelect("unit._assignments", "assignment")
        .leftJoinAndSelect("assignment._assignmentUsers", "assignmentUsers")
        .where("unit.idCourse=:idCourse", {idCourse: idCourse})
        .andWhere("unit.visible>0")
        .andWhere("assignment.visible IS NULL").orWhere("assignment.visible>0") 
        .orderBy("unit.order", "ASC")
        .getMany();
    } 

    // Load units with associated assignments created by the teacher
    listCreated(idCourse: number) {
        return  this.createQueryBuilder("unit")
        .leftJoinAndSelect("unit._assignments", "assignment")
        .leftJoinAndSelect("assignment._assignmentUsers", "assignmentUsers")
        .where("unit.idCourse=:idCourse", {idCourse: idCourse})
        .orderBy("unit.order", "ASC")
        .getMany();
    }

     // Load units with associated assignments created by the teacher
     listUnitsOnly(idCourse: number) {
        return  this.createQueryBuilder("unit")
        .where("unit.idCourse=:idCourse", {idCourse: idCourse})
        .orderBy("unit.order", "ASC")
        .getMany();
    }
 
}