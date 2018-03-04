import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { UserModel } from '../entities/UserModel';


@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> {
       
    list() {
        return this.find();
    }

    findByUsername(username: string){
        return this.findOne({username: username});
    }
}