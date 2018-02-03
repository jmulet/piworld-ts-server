import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class visualization_quizz {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idV:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    formulation:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    answer:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    rightAnswer:string;
        

    @Column("tinyint",{ 
        nullable:true, 
        })
    isValid:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    penalty:number;
        
}