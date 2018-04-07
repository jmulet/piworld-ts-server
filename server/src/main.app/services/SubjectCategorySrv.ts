import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { SubjectModel } from '../entities/SubjectModel';
import { LoginsModel } from '../entities/LoginsModel';
import { SubjectCategoryModel } from '../entities/SubjectCategoryModel';
 

@Service()
export class SubjectCategorySrv {
    repository: Repository<SubjectCategoryModel>;

    constructor() {
        this.repository = getRepository(SubjectCategoryModel);
    }
   
    list(){
        return this.repository.find();
    }

    save(entity: SubjectCategoryModel) {
        return this.repository.save(entity);
    }


    findById(id: number) {
        return this.repository.findOne({id: id});
    }
  
    delete(entity: SubjectCategoryModel) {
      return this.repository.remove(entity);
    }

    deleteById(id: number) {
        return this.repository.delete(id);
    }

    static fromData(idSubject?: number, shortName?: string, longName?: string) {
        const entity = new SubjectCategoryModel();
        entity.idSubject = idSubject;
        entity.longname = longName;
        entity.name = shortName;
        return entity;
    }
 
}