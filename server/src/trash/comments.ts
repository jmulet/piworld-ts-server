import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class comments {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idUser:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idActivity:number;
        

    @Column("timestamp",{ 
        nullable:false,
        default:"CURRENT_TIMESTAMP", 
        })
    when:Date;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    comment:string;
        
}