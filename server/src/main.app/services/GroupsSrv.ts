import { Service } from 'typedi';
import { getRepository, Repository, Entity } from 'typeorm';
 
import { GroupsModel } from '../entities/GroupsModel';


@Service()
export class GroupsSrv {
    repository: Repository<GroupsModel>;
   
    constructor(){
        this.repository = getRepository(GroupsModel); 
    }

    find(idGroup: number){
        return this.repository.findOne({id: idGroup});
    }

    findCreated(idUser: number){
        return this.repository.find({idUserCreator: idUser});
    }
 
    save(entity: GroupsModel) {
        return this.repository.save(entity);
    }

    del(entity: GroupsModel) {
        return this.repository.remove(entity);
    }

    async deleteById(idGroup: number) {
         const entity = await this.repository.find({id: idGroup});
         return this.repository.remove(entity);            
    }
}