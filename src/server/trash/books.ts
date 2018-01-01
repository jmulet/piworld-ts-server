import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class books {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    bookCode:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    title:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    author:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    url:string;
        

    @Column("int",{ 
        nullable:true, 
        })
    year:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:25, 
        })
    level:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:25, 
        })
    genre:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    img:string;
        

    @Column("tinyint",{ 
        nullable:true, 
        })
    key:number;
        

    @Column("tinyint",{ 
        nullable:true, 
        })
    allStudents:number;
        

    @Column("tinyint",{ 
        nullable:true, 
        })
    allTeachers:number;
        
}