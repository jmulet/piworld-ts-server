import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class units {


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
    idGroup:number;
        

    @Column("longtext",{ 
        nullable:false, 
        })
    unit:string;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    order:number;
        

    @Column("tinyint",{ 
        nullable:false,
        default:"1", 
        })
    visible:number;
        
}