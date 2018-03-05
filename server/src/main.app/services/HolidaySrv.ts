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
    findBySchoolName(name: string, year: number) {
        let builder = this.repository.createQueryBuilder("h").innerJoin("h._school", "s")
            .where("s.schoolName=:name", {name: name});
        if (year) {
            builder = builder.where("h.year=:year", {year: year});
        }
        return builder.orderBy("h.fromDate", "ASC").getMany();
    }

    findBySchoolId(idSchool: number, year: number) {
        let search: any = {idSchool: idSchool};
        if (year) {
            search.year = year;
        }
        return this.repository.find({where: search, order: {"fromDate": "ASC"}});
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