import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity("groups")
export class GroupsModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255, 
        })
    groupName:string;
        

    @Column("int",{ 
        nullable:false,
        default:"1", 
        })
    groupLevel:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:5,
        default:"BAT", 
        })
    groupStudies:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        default:"A", 
        })
    groupLetter:string;
        

    @Column("int",{ 
        nullable:true, 
        })
    groupYear:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    idUserCreator:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255, 
        })
    enrollPassword:string;
        

    @Column("int",{ 
        nullable:false,
        default:"1", 
        })
    idSubject:number;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    currentUnit:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    gopts:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    thmcss:string;
        
}