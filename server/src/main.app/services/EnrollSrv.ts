import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { EnrollModel } from '../entities/EnrollModel';


@Service()
export class EnrollSrv {
    enrollRepository: Repository<EnrollModel>;

    constructor() {
        this.enrollRepository = getRepository(EnrollModel);
    }

    static fromData(idUser?: number, idRole?: number) {
        const entity = new EnrollModel();
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
            .innerJoinAndSelect("enroll.group", "group")
            .where("enroll.idUser=:idUser", {idUser: idUser})
            .getMany();
    }
 
}