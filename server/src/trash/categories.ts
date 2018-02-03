import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class categories {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idSubject:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    category:string;
        
}