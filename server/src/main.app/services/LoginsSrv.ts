import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { LoginsModel } from '../entities/LoginsModel';


@Service()
export class LoginsSrv {
    loginsRepository: Repository<LoginsModel>;
    
    constructor(){
        this.loginsRepository = getRepository(LoginsModel);
    }

    static fromData(idUser = 0, ip = "", login = new Date(), parents: 0 | 1 = 0): LoginsModel  {
        const logInstance = new LoginsModel();
        logInstance.idUser = idUser;
        logInstance.ip = ip;
        logInstance.login = login;
        logInstance.parents = parents;
        return logInstance;
    }
    
    //Important return statement since a promise is returned to the controller layer
    save(login: LoginsModel) {
        return this.loginsRepository.save(login);
    }

    //Return a list of logins done by a given user
    listByIdUser(idUser: number) {
        return this.loginsRepository.find({idUser: idUser});
    }
    
    listByUsername(username: string) {
        return this.loginsRepository.createQueryBuilder("login")
        .innerJoin("login.user", "user")
        .where("user.username = :username")
        .setParameters({ username: username})
        .getMany();
    }
}
