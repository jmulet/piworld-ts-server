import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class badges {


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
        nullable:true, 
        })
    type:number;
        

    @Column("date",{ 
        nullable:false, 
        })
    day:string;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    rscore:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    idCreator:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idGroup:number;
        
}