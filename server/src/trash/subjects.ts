import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class subjects {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:11,
        default:"", 
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    longname:string;
        
}