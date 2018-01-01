import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class challenges_quizz {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idChallenge:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idUser:number;
        

    @Column("datetime",{ 
        nullable:true, 
        })
    when:Date;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    answer:string;
        

    @Column("int",{ 
        nullable:true, 
        })
    valid:number;
        
}