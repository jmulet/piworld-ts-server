import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
 
import { GroupsModel } from '../entities/GroupsModel';


@Service()
export class GroupsSrv {
    repository: Repository<GroupsModel>;
   
    constructor(){
        this.repository = getRepository(GroupsModel); 
    }
 
    public save(entity: GroupsModel) {
        return this.repository.save(entity);
    }

    public delete(entity: GroupsModel) {
        return this.repository.delete(entity);
    }

    public deleteById(id: number) {
         return this.repository.deleteById(id);
    }
}