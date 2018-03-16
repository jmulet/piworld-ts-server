import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { ChatModel } from '../../main.app/entities/classroom/ChatModel';


@Service()
export class ChatSrv {
    chatRepository: Repository<ChatModel>;
   
    constructor(){
        this.chatRepository = getRepository(ChatModel); 
    }
 
    save(entity: ChatModel) {
        return this.chatRepository.save(entity);
    }

    delete(entity: ChatModel) {
        return this.chatRepository.remove(entity);
    }

    async deleteById(id: number) {
        const entity = await this.chatRepository.find({id: id});
        return this.chatRepository.remove(entity);
    }

    list(idGroup: number, idUser?: number, fromDate?: Date, toDate?: Date, isFor?: number, parents?: number) {
 
        let builder = this.chatRepository.createQueryBuilder("c")
            .where("c.idGroup=:idGroup", {idGroup: idGroup}).andWhere("c.parents="+parents?"1":"0");
        
        if (idUser) {
            builder = builder.andWhere("c.idUser=:idUser", {idUser: idUser});
        }
        if (fromDate) {
           builder = builder.andWhere("c.day >=:fromDate", {fromDate: fromDate});
        }
        if (toDate) {
            builder = builder.andWhere("c.day <=:toDate", {toDate: toDate});
        }
        if (isFor) {
            builder = builder.andWhere("c.isFor =:isFor", {isFor: isFor});
        } 

        return builder.getMany();
    }
 
}