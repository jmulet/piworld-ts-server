import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { TermsModel } from '../entities/TermsModel';
import { LoginsModel } from '../entities/LoginsModel';
 

@Service()
export class TermsSrv {
    repository: Repository<TermsModel>;

    constructor() {
        this.repository = getRepository(TermsModel);
    }

    /**
     * List all groups which idUser is enrolled to
     * @param idUser 
     */
    findBySchoolName(name: string, year: number) {
        return this.repository.createQueryBuilder("t").innerJoin("t._school", "s")
            .where("s.schoolName=:name", {name: name})
            .andWhere("t.year=:year", {year: year})
            .getMany();
    }

    findBySchoolId(idSchool: number, year: number) {
        return this.repository.find({idSchool: idSchool, year: year});
    }

    findById(id: number) {
        return this.repository.findOne({id: id});
    }

    save(entity: TermsModel){
        return this.repository.save(entity);
    }
 

    delete(entity: TermsModel) {
      return this.repository.remove(entity);
    }

    deleteById(id: number) {
        return this.repository.delete(id);
    }
 
}