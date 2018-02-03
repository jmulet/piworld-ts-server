import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class challenges {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    w:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    level:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    formulation:string;
        

    @Column("int",{ 
        nullable:false,
        default:"150", 
        })
    score:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    ranswer:string;
        
}