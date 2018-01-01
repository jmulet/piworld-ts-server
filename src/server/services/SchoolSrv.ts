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
    public findBySchoolName(name: string) {
        return this.schoolsRepository.createQueryBuilder("s")
            .where("s.schoolName=:name", {name: name})
            .getOne();
    }

    public save(entity: SchoolModel){
        return this.schoolsRepository.save(entity);
    }
 
}