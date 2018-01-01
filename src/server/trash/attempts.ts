import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class attempts {


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
    idLogins:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idActivity:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    idAssignment:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idGroup:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    idKahoot:number;
        

    @Column("datetime",{ 
        nullable:true, 
        })
    attemptStart:Date;
        

    @Column("datetime",{ 
        nullable:true, 
        })
    attemptEnd:Date;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    score:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    level:number;
        
}