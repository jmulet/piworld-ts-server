import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class visualization {


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
        nullable:false,
        default:"0", 
        })
    idAssignment:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    resource:string;
        

    @Column("int",{ 
        nullable:true, 
        })
    vscore:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    vseconds:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idLogins:number;
        
}