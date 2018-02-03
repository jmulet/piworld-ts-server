import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class questions_copy {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true,
        default:"0", 
        })
    idAttempt:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    question:string;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    seconds:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        default:"g", 
        })
    category:string;
        

    @Column("tinyint",{ 
        nullable:true,
        default:"0", 
        })
    level:number;
        
}