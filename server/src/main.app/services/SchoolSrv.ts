import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { SchoolModel } from '../entities/SchoolModel';
import { LoginsModel } from '../entities/LoginsModel';
 

@Service()
export class SchoolSrv {
    schoolsRepository: Repository<SchoolModel>;

    constructor() {
        this.schoolsRepository = getRepository(SchoolModel);
    }

    /**
     * List all groups which idUser is enrolled to
     * @param idUser 
     */
    findBySchoolName(name: string) {
        return this.schoolsRepository.createQueryBuilder("s")
            .where("s.schoolName=:name", {name: name})
            .getOne();
    }

    findById(idSchool: number) {
        return this.schoolsRepository.findOne({id: idSchool});
    }

    save(entity: SchoolModel){
        return this.schoolsRepository.save(entity);
    }

    list() {
        return this.schoolsRepository.find();
    }

    delete(entity: SchoolModel) {
        if (entity.schoolName === 'buildin_admin_school') {
            return false;
        }
        return this.schoolsRepository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.findById(id);
        if (entity && entity.schoolName === 'buildin_admin_school') {
            return false;
        }
        return this.schoolsRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: id })
            .execute();
    }
 
}