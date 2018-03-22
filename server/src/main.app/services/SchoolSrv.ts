import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { SchoolModel } from '../entities/SchoolModel';
import { LoginsModel } from '../entities/LoginsModel';
import { UserRoles } from '../entities/UserModel';
 

@Service()
export class SchoolSrv {
    repository: Repository<SchoolModel>;

    constructor() {
        this.repository = getRepository(SchoolModel);
    }
     
    findBySchoolName(name: string) {
        return this.repository.createQueryBuilder("s")
            .where("s.schoolName=:name", {name: name})
            .andWhere("s.sdr IS NULL")
            .getOne();
    }

    findById(idSchool: number) {
        return this.repository.createQueryBuilder("s")
        .where("s.id=:id", {id: idSchool})
        .andWhere("s.sdr IS NULL")
        .getOne();
    }

    save(entity: SchoolModel){
        return this.repository.save(entity);
    }

    list(showSoftDeleted?: number) {
        let builder = this.repository.createQueryBuilder("s");
        if (showSoftDeleted >=0) {
           builder = builder.where("s.sdr > :role", {role: showSoftDeleted});
        } else {
           builder = builder.where("s.sdr IS NULL")
        }
        return builder.getMany();
    }

    delete(entity: SchoolModel) {
        if (entity.schoolName === 'buildin_admin_school') {
            return false;
        }
        entity.sdd = new Date();
        entity.sdr = entity.sdr || UserRoles.admin;
        return this.repository.save(entity);
    }

    hardDelete(entity: SchoolModel) {
        if (entity.schoolName === 'buildin_admin_school') {
            return false;
        }
        return this.repository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.findById(id);
        if (entity) {
            if (entity.schoolName === 'buildin_admin_school') {
                return false;
            }
            return this.delete(entity);
        } else {
            return false;
        }
        
    }

    async hardDeleteById(id: number) {
        const entity = await this.findById(id);
        if (entity && entity.schoolName === 'buildin_admin_school') {
            return false;
        }
        return this.repository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: id })
            .execute();
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