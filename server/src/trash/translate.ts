import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class translate {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idActivity:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:11,
        default:"", 
        })
    lang:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        default:"admin", 
        })
    translator:string;
        
}