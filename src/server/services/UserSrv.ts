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

    findByUsername(username: string){
        // Load the school relationship as well
        return  this.userRepository.createQueryBuilder("user")
            .innerJoinAndSelect("user.school", "school")
            .where("user.username = :username")
            .setParameters({ username: username})
            .getOne();
    }

    save(user: UserModel) {
        return this.userRepository.save(user);
    }
  
    findBySchoolId(schoolId: number, showStudents: boolean): any {
            // Load the school relationship as well
            const builder = this.userRepository.createQueryBuilder("user") 
            .where("user.schoolId = :schoolId");

            // Never include admin since it is created from config file.
            if (!showStudents) {
                builder.andWhere("user.idRole > " + UserRoles.admin).andWhere("user.idRole<"+ UserRoles.student);
            } else {
                builder.andWhere("user.idRole > " + UserRoles.admin);
            }

            return builder.setParameters({schoolId: schoolId}).getMany();
    }

    findById(id) {
        return this.userRepository.findOneById(id);
    }

    delete(entity: UserModel){
        return this.userRepository.delete(entity);
    }
}