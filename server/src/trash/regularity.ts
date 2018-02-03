import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class regularity {


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
    idUser:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    week:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    rscore:number;
        
}