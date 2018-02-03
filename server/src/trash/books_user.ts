import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class books_user {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idbook:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idUser:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idGroup:number;
        

    @Column("datetime",{ 
        nullable:true, 
        })
    expires:Date;
        
}