import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class assignments {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:true,
        default:"0", 
        })
    idActivity:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idUser:number;
        

    @Column("int",{ 
        nullable:true, 
        })
    idUnit:number;
        

    @Column("timestamp",{ 
        nullable:true, 
        })
    postDate:Date;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    order:number;
        

    @Column("timestamp",{ 
        nullable:true, 
        })
    fromDate:Date;
        

    @Column("timestamp",{ 
        nullable:true, 
        })
    toDate:Date;
        

    @Column("int",{ 
        nullable:true,
        default:"0", 
        })
    maxAttempts:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    instructions:string;
        

    @Column("tinyint",{ 
        nullable:false,
        default:"0", 
        })
    applyToAll:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    params:string;
        

    @Column("tinyint",{ 
        nullable:true,
        default:"1", 
        })
    visible:number;
        
}