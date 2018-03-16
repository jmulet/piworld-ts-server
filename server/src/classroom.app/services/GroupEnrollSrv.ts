import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { GroupsEnrollModel } from '../../main.app/entities/classroom/GroupsEnrollModel';


@Service()
export class EnrollSrv {
    enrollRepository: Repository<GroupsEnrollModel>;

    constructor() {
        this.enrollRepository = getRepository(GroupsEnrollModel);
    }

    static fromData(idUser?: number, idRole?: number) {
        const entity = new GroupsEnrollModel();
        entity.idUser= idUser;
        entity.idRole = idRole;
        return entity;
    }
    

    /**
     * List all groups which idUser is enrolled to
     * @param idUser 
     */
    list(idUser: number) {
        return this.enrollRepository.createQueryBuilder("enroll")
            .innerJoinAndSelect("enroll._group", "group")
            .where("enroll.idUser=:idUser", {idUser: idUser})
            .getMany();
    }
 
}