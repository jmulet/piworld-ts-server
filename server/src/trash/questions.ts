import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class questions {


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
        

    @Column("longtext",{ 
        nullable:true, 
        })
    rightAnswer:string;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    seconds:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    score:number;
        

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
        

    @Column("varchar",{ 
        nullable:true,
        length:4, 
        })
    askTheory:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:4, 
        })
    askHelp:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:4, 
        })
    askAnswer:string;
        
}