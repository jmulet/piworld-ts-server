import { Service, Inject } from "typedi";
import { getRepository, Repository, getCustomRepository } from "typeorm";
import { UserModel, UserRoles } from "../entities/UserModel";
import { UserRepository } from "../repositories/UserRepository";
import { OffspringModel } from "../entities/OffspringModel";
import { OffspringRepository } from "../repositories/OffspringRepository";
 

@Service()    
export class UserSrv {
    userRepository: UserRepository;
    offspringRepository: OffspringRepository;
    
    constructor(){
        this.userRepository = getCustomRepository(UserRepository); 
        this.offspringRepository = getCustomRepository(OffspringRepository); 
    }

    public list() {
        return this.userRepository.find();
    }

    findByUsername(username: string, fields?: string[]){
        // Load the school relationship as well
        fields = fields || [];
        let builder = this.userRepository.createQueryBuilder("user");
        
        fields.forEach( (field)=> builder = builder.addSelect("user." + field));
        
        return builder.innerJoinAndSelect("user._school", "school")
            .where("user.username = :username", { username: username})
            .getOne();
    }

    async save(user: UserModel) {       
        const offspring = [...(user._offspring || []) ];
        delete user._offspring;
        const updated = await this.userRepository.save(user);
        offspring.forEach( (e) => e.idParent = updated.id );
     
        if (user.idRole === UserRoles.parents) {
            await this.offspringRepository.createQueryBuilder().delete()
                .where("idParent=:idParent", {idParent: updated.id}).execute();
             
            await this.offspringRepository.saveByUsername(offspring);
        }
        
        
        return updated
    }
  
    findBySchoolId(idSchool: number, filter: string, offspring?: number): any {
            // Load the school relationship as well
            let builder = this.userRepository.createQueryBuilder("user");
            if (offspring) {
                builder = builder.leftJoinAndSelect("user._offspring", "offspring");
            }             
            builder = builder.where("user.idSchool = :idSchool");

            // Never include admin since it is created from config file.
            if (!filter || filter === "*") {
                builder = builder.andWhere("user.idRole > " + UserRoles.admin);
            } else {
                builder = builder.andWhere("user.idRole > " + UserRoles.admin).andWhere("user.idRole="+ filter);                
            }

            return builder.setParameters({idSchool: idSchool}).getMany();
    }

    findById(id) {
        return this.userRepository.findOne({id: id});
    }

    delete(entity: UserModel){
        return this.userRepository.delete(entity.id);
    }
}