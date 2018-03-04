import { EntityRepository, getCustomRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
 
import { OffspringModel } from '../entities/OffspringModel';
import { UserRepository } from './UserRepository';


@EntityRepository(OffspringModel)
export class OffspringRepository extends Repository<OffspringModel> {
    
    userRepository: UserRepository;
    constructor() {
        super();
        this.userRepository = getCustomRepository(UserRepository);
    }

    list() {
        return this.find();
    }

    private async saveEntityByUsername(entity: OffspringModel){    
        if (entity.username && !entity.idChild) {
            const user = await this.userRepository.findByUsername(entity.username);  
            if (user) {          
                entity.idChild = user.id;
                return this.save(entity);
            } else {
                return null;
            }
        } else {
            return this.save(entity);
        }
    }

    saveByUsername(entities: OffspringModel | OffspringModel[]){

        if(Array.isArray(entities) ) {
            const promises = [];
            entities.forEach( (e)=> {
                promises.push(this.saveEntityByUsername(e));
            })
            return Promise.all(entities);
        } else {
            return this.saveEntityByUsername(entities);
        }
    }
}