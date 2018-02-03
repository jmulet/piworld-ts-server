import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class kahoot {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idActivity:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idAssignment:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idTeacher:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idGroup:number;
        

    @Column("timestamp",{ 
        nullable:true, 
        })
    start:Date;
        

    @Column("timestamp",{ 
        nullable:true, 
        })
    end:Date;
        
}