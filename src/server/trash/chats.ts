import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class chats {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idGroup:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idUser:number;
        

    @Column("timestamp",{ 
        nullable:true, 
        })
    when:Date;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    msg:string;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    isFor:number;
        

    @Column("tinyint",{ 
        nullable:false,
        default:"0", 
        })
    parents:number;
        
}