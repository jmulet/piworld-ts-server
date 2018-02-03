import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class pda_activities_grades {


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
        

    @Column("int",{ 
        nullable:true, 
        })
    idUser:number;
        

    @Column("float",{ 
        nullable:true, 
        })
    grade:number;
        
}