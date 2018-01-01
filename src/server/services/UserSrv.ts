import { Service, Inject } from "typedi";
import { getRepository, Repository, getCustomRepository } from "typeorm";
import { UserModel, UserRoles } from "../entities/UserModel";
import { UserRepository } from "../repositories/UserRepository";
 

@Service()
export class UserSrv {
    userRepository: Repository<UserModel>;
    
    constructor(){
        this.userRepository = getCustomRepository(UserRepository); 
    }

    public list() {
        return this.userRepository.find();
    }

    async findByUsername(username: string){
        // Load the school relationship as well
        const user = await  this.userRepository.createQueryBuilder("user")
            .innerJoinAndSelect("user.school", "school")
            .where("user.username = :username")
            .setParameters({ username: username})
            .getOne();

        return user;
    }

    save(user: UserModel) {
        return this.userRepository.save(user);
    }
  
}