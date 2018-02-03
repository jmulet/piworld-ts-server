import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class ratings {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:false, 
        })
    idActivity:number;
        

    @Column("int",{ 
        nullable:false, 
        })
    idUser:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    rate:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    vrate:number;
        
}