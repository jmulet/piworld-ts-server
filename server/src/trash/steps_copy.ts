import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class steps_copy {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idQuestion:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    step:string;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    seconds:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    rightAnswer:string;
        
}