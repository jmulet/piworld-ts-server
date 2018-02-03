import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class pda_activities {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("tinyint",{ 
        nullable:true, 
        })
    trimestre:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    desc:string;
        

    @Column("date",{ 
        nullable:true, 
        })
    dia:string;
        

    @Column("int",{ 
        nullable:true, 
        })
    idCreator:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idGroup:number;
        

    @Column("float",{ 
        nullable:true, 
        })
    weight:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    category:string;
        

    @Column("tinyint",{ 
        nullable:true,
        default:"1", 
        })
    visible:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    formula:string;
        
}