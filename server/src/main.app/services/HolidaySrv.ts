import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { HolidayModel } from '../entities/HolidayModel';
import { LoginsModel } from '../entities/LoginsModel';
 

@Service()
export class HolidaySrv {
    repository: Repository<HolidayModel>;

    constructor() {
        this.repository = getRepository(HolidayModel);
    }

    /**
     * List all groups which idUser is enrolled to
     * @param idUser 
     */
    findBySchoolName(name: string) {
        return this.repository.createQueryBuilder("h").innerJoin("h._school", "s")
            .where("s.schoolName=:name", {name: name})
            .getMany();
    }

    findBySchoolId(idSchool: number) {
        return this.repository.find({idSchool: idSchool});
    }

    findById(id: number) {
        return this.repository.findOne({id: id});
    }

    save(entity: HolidayModel){
        return this.repository.save(entity);
    }
 

    delete(entity: HolidayModel) {
      return this.repository.remove(entity);
    }

    deleteById(id: number) {
        return this.repository.delete(id);
    }
 
}