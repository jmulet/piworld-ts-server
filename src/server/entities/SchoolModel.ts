import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("schools") 
export class SchoolModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
    
    @Column("varchar",{ 
        nullable:false,
        length:255, 
        })
    schoolName:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    professorName:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    professorEmail:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:5,
        default:"ca", 
        })
    language:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    enrollPassword:string;
        

    @Column("tinyint",{ 
        nullable:false,
        default:"0", 
        })
    canEnroll:number;
        

    @Column("int",{ 
        nullable:false,
        default:"1", 
        })
    canPublish:number;
        
}