import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class forums {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        default:"", 
        })
    forum:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    description:string;
        

    @Column("int",{ 
        nullable:false, 
        })
    createdBy:number;
        

    @Column("timestamp",{ 
        nullable:false,
        default:"CURRENT_TIMESTAMP", 
        })
    createdWhen:Date;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    idGroup:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        default:"", 
        })
    canCreateThemes:string;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    visited:number;
        
}