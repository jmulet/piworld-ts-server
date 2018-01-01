import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class news {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    html:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    title:string;
        

    @Column("datetime",{ 
        nullable:true, 
        })
    expires:Date;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    order:number;
        
}