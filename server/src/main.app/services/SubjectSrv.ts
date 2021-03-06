import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { SubjectModel } from '../entities/SubjectModel';
import { LoginsModel } from '../entities/LoginsModel';
 

@Service()
export class SubjectSrv {
    repository: Repository<SubjectModel>;

    constructor() {
        this.repository = getRepository(SubjectModel);
    }
   
    list(){
        return this.repository.find();
    }

    save(entity: SubjectModel) {
        return this.repository.save(entity);
    }


    findById(id: number) {
        return this.repository.findOne({id: id});
    }
  
 
    delete(entity: SubjectModel) {
      return this.repository.remove(entity);
    }

    deleteById(id: number) {
        return this.repository.delete(id);
    }

    static fromData(shortName?: string, longName?: string) {
        const entity = new SubjectModel();
        entity.longname = longName;
        entity.name = shortName;
        return entity;
    }
 
}