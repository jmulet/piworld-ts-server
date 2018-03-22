import { Service, Inject } from "typedi";
import { getRepository, Repository, getCustomRepository } from "typeorm";
import { UserModel, UserRoles } from "../entities/UserModel";
import { UserRepository } from "../repositories/UserRepository";
import { OffspringModel } from "../entities/OffspringModel";
import { OffspringRepository } from "../repositories/OffspringRepository";
 

@Service()    
export class UserSrv {
    repository: UserRepository;
    offspringRepository: OffspringRepository;
    
    constructor(){
        this.repository = getCustomRepository(UserRepository); 
        this.offspringRepository = getCustomRepository(OffspringRepository); 
    }

    public list(showSoftDeleted?: number) {
        let builder = this.repository.createQueryBuilder("user");
        if (showSoftDeleted >=0) {
           builder = builder.where("user.sdr > :role", {role: showSoftDeleted});
        } else {
           builder = builder.where("user.sdr IS NULL")
        }
        return builder.getMany()
    }

    findByUsername(username: string, fields?: string[]){
        // Load the school relationship as well
        fields = fields || [];
        let builder = this.repository.createQueryBuilder("user");
        
        fields.forEach( (field)=> builder = builder.addSelect("user." + field));
        
        return builder.innerJoinAndSelect("user._school", "school")
            .where("user.username = :username", { username: username})
            .andWhere("user.sdr IS NULL")
            .getOne();
    }

    async save(user: UserModel) {       
        const offspring = [...(user._offspring || []) ];
        delete user._offspring;
        const updated = await this.repository.save(user);
        offspring.forEach( (e) => e.idParent = updated.id );
     
        if (user.idRole === UserRoles.parents) {
            await this.offspringRepository.createQueryBuilder().delete()
                .where("idParent=:idParent", {idParent: updated.id}).execute();
             
            await this.offspringRepository.saveByUsername(offspring);
        }
        
        
        return updated
    }
  
    findBySchoolId(idSchool: number, role: string, offspring?: number, showSoftDeleted?: number): any {
            // Load the school relationship as well
            let builder = this.repository.createQueryBuilder("user");
            if (offspring) {
                builder = builder.leftJoinAndSelect("user._offspring", "offspring");
            }             
            if (idSchool) {
                builder = builder.where("user.idSchool = :idSchool", {idSchool: idSchool});
            }
            
            // Never include admin since it is created from config file.
            if (!role || role === "*") {
                builder = builder.andWhere("user.idRole > " + UserRoles.admin);
            } else {
                builder = builder.andWhere("user.idRole > " + UserRoles.admin).andWhere("user.idRole="+ role);                
            }

            if (showSoftDeleted >=0) {
               builder = builder.where("user.sdr > :role", {role: showSoftDeleted});
            } else {
               builder = builder.where("user.sdr IS NULL")
            }

            return builder.getMany();
    }

    findById(id) {
        return this.repository.createQueryBuilder("user")
            .where("user.id = :id", {id: id})
            .andWhere("user.sdr IS NULL")
            .getOne();
    }

    delete(entity: UserModel){
        entity.sdd = new Date();
        entity.sdr = entity.sdr || UserRoles.admin;
        return this.repository.save(entity);
    }

    hardDelete(entity: UserModel){
        return this.repository.delete(entity.id);
    }

    releaseSoftDeletes(days: number) {
        return this.repository.createQueryBuilder("e").delete()
        .where("DATEDIFF(NOW(), e.sdd) > :days", { days: days })
        .execute();
    }

    restoreSoftDelete(id?: number) {
        return this.repository.createQueryBuilder("e").update()
            .set({ sdd: null, sdr: null })
            .where("e.sdd IS NOT NULL").andWhere(id ? "e.id=:id" : "1=1", { id: id })
            .execute();
    }
}