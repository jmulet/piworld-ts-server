import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';

import { SectionModel } from '../../main.app/entities/classroom/SectionModel'; 
import { UserRoles } from '../../main.app/entities/UserModel';


@Service()
export class SectionSrv {
    repository: Repository<SectionModel>;
   
    constructor(){
        this.repository = getRepository(SectionModel); 
    }

    // get by idActivity && idCreator
    list(idActivity: number, idCreator?: number, idUnit?: number, showSoftDeleted?: number) {        
        let builder = this.repository.createQueryBuilder("section").where("section.idActivity=:idActivity", {idActivity: idActivity});
        if (idCreator) {
            builder = builder.andWhere("section.idCreator=:idCreator", {idCreator: idCreator});
        }
        if (idUnit) {
            builder = builder.andWhere("section.idUnit=:idUnit", {idUnit: idUnit});
        }
        if (showSoftDeleted >=0) {
           builder = builder.andWhere("section.sdr > :role", {role: showSoftDeleted});
        } else {
           builder = builder.andWhere("section.sdr IS NULL")
        }
        return builder.getMany();
    }
 
    // Assignment_users are saved by cascade... Specify in AssignmentModel.assigmentUsersModel[]
    save(entity: SectionModel) {
        return this.repository.save(entity);
    }

    delete(entity: SectionModel) {
        entity.sdd = new Date();
        entity.sdr = entity.sdr || UserRoles.admin;
        return this.repository.save(entity);
    }

    hardDelete(entity: SectionModel) {
        return this.repository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.repository.findOne({id: id});
        if (entity) {
            return this.delete(entity);
        }
        return false;
    }

    async hardDeleteById(id: number) {
        const entity = await this.repository.findOne({id: id});
        return this.repository.remove(entity);
    }

    releaseSoftDeletes(days: number) {
        return this.repository.createQueryBuilder("e").delete()
        .where("DATEDIFF(NOW(), e.sdd) > :days", { days: days })
        .execute();
    }

    restoreSoftDelete(id?: number) {
        return this.repository.createQueryBuilder("e").update()
            .set({ sdd: null, sdr: null })
            .where("e.sdd IS NOT NULL").andWhere(id ? "e.id=:id" : "1=1", { id: id })
            .execute();
    }

}