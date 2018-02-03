import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class answers_copy {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    idStep:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    answer:string;
        
}