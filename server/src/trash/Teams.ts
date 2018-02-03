import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class Teams {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    name:string;
        

    @Column("int",{ 
        nullable:true, 
        })
    rating:number;
        
}