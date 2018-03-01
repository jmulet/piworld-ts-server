import { Service, Inject } from 'typedi';
import { getRepository, Repository, Entity } from 'typeorm';
 
import { GroupsModel } from '../entities/GroupsModel';
import { EnrollSrv } from './EnrollSrv';
import { UserRoles } from '../entities/UserModel';


@Service()
export class GroupsSrv {
    repository: Repository<GroupsModel>;
   
    @Inject()
    enrollSrv: EnrollSrv;

    constructor(){
        this.repository = getRepository(GroupsModel); 
    }
   
   static fromData(name?: string, year?: number, idUserCreator?: number) {
        const entity = new GroupsModel();
        entity.name = name;
        entity.year = year;
        entity.idUserCreator = idUserCreator;
        return entity;
    }

    find(idGroup: number){
        return this.repository.findOne({id: idGroup});
    }

    findCreated(idUser: number){
        return this.repository.find({idUserCreator: idUser});
    }
 
    save(entity: GroupsModel) {
        //And enroll the creator automagically
        if (!entity.enrolls) {
            const enroll1 = EnrollSrv.fromData(entity.idUserCreator, UserRoles.teacher_admin);
            entity.enrolls = [ enroll1 ];
        }
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