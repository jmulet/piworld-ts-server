import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

import { FamousEqnModel } from '../entities/FamousEqnModel';
import { FamousQuoteModel } from '../entities/FamousQuoteModel';

export interface FamousInterface<T> {
    findById(id: number);

    list(idUser: number);

    getRandom(n?: number);
 
    save(entity: T);

    saveArray(entities: T[]);
 
    delete(entity: T);

    deleteById(id: number);

    parseImport(text: string, idUser: number);

}
 
class Equation implements FamousInterface<FamousEqnModel> {
    repository: Repository<FamousEqnModel>;

    constructor() {
        this.repository = getRepository(FamousEqnModel);
    }
     
    findById(id: number) {
        return this.repository.findOne({id: id});
    }

   
    public list(idUser: number) {
        
        let builder = this.repository.createQueryBuilder("eqn");
        if (idUser > 1) {
            builder = builder.where("eqn.idUserCreator=:idUser", {idUser: idUser});
        }    
        return builder.orderBy("eqn.id", "DESC").getMany();
        
    }


    getRandom(n?: number) {
        if (n > 1) {
            return this.repository.createQueryBuilder().orderBy("RAND()").limit(n).getMany();
        } else {
            return this.repository.createQueryBuilder().orderBy("RAND()").limit(1).getOne();
        }
        
    }
 
    save(entity: FamousEqnModel){
        return this.repository.save(entity);
    }

    saveArray(entities: FamousEqnModel[]){
        return this.repository.save(entities);
    }
 
    delete(entity: FamousEqnModel) {
      return this.repository.remove(entity);
    }

    deleteById(id: number) {
        return this.repository.delete(id);
    }

    parseImport(text: string, idUser: number): FamousEqnModel[] {
        const list = [];
        let parsed = text.split('[eqn]').filter(e => e.trim());
        let parsed1 = parsed.map( (e) => {
            const parsed2 = e.replace(/\n/g, '').split("[title]").filter(e2 => e2.trim());
            const eqn = parsed2[0] || "";
            let title = "";
            let url = "";
            if (parsed2[1]) {
                const parsed3 = parsed2[1].replace(/\n/g, '').split("[url]").filter(e3 => e3.trim());
                title = parsed3[0] || "";
                url = parsed3[1] || "";
            }
            list.push({
                idUserCreator: idUser,
                eqn: eqn,
                title: title,
                url: url
            });
        });
        return list;
    }
}



class Quote implements FamousInterface<FamousQuoteModel> {
    repository: Repository<FamousQuoteModel>;

    constructor() {
        this.repository = getRepository(FamousQuoteModel);
    }

    findById(id: number) {
        return this.repository.findOne({id: id});
    }

    public list(idUser: number) {
        let builder = this.repository.createQueryBuilder("quote");
        if (idUser > 1) {
            builder = builder.where("quote.idUserCreator=:idUser", {idUser: idUser});
        }    
        return builder.orderBy("quote.id", "DESC").getMany();
    }

    getRandom(n?: number) {
        if (n > 1) {
            return this.repository.createQueryBuilder().orderBy("RAND()").limit(n).getMany();
        } else {
            return this.repository.createQueryBuilder().orderBy("RAND()").limit(1).getOne();
        }
        
    }
 
    save(entity: FamousQuoteModel){
        return this.repository.save(entity);
    }

    saveArray(entities: FamousQuoteModel[]){
        return this.repository.save(entities);
    }

    delete(entity: FamousQuoteModel) {
      return this.repository.remove(entity);
    }

    deleteById(id: number) {
        return this.repository.delete(id);
    }
 
    parseImport(text: string, idUser: number): FamousQuoteModel[] {
        const list = [];
        let parsed = text.split('[quote]').filter(e => e.trim());
        let parsed1 = parsed.map( (e) => {
            const parsed2 = e.replace(/\n/g, '').split("[author]").filter(e2 => e2.trim());
            const quote = parsed2[0] || "";
            let author = "";
            let url = "";
            if (parsed2[1]) {
                const parsed3 = parsed2[1].replace(/\n/g, '').split("[url]").filter(e3 => e3.trim());
                author = parsed3[0] || "";
                url = parsed3[1] || "";
            }
            list.push({
                idUserCreator: idUser,
                quote: quote,
                author: author,
                url: url
            });
        });
        return list;
    }
}



@Service()
export class FamousSrv {
    quote: Quote;
    equation: Equation;
    constructor() {
        this.equation = new Equation();
        this.quote = new Quote();
    }
}