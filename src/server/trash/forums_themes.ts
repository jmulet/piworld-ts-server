import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class forums_themes {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:false, 
        })
    idForum:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        default:"", 
        })
    theme:string;
        

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
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        default:"", 
        })
    canCreateEntries:string;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    visited:number;
        
}