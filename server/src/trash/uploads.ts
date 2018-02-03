import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class uploads {


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
    idAssignment:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    idUser:number;
        

    @Column("longtext",{ 
        nullable:false, 
        })
    file:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    message:string;
        

    @Column("datetime",{ 
        nullable:true, 
        })
    uploadDate:Date;
        

    @Column("int",{ 
        nullable:false,
        default:"-1", 
        })
    score:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    feedback:string;
        
}