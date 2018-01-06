import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsInt, Length, Validate, IsOptional, Min } from 'class-validator';
import { JsonStringValidator } from '../validators/JsonStringValidator';
import { UserModel } from './UserModel';


@Entity("groups")
export class GroupsModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
    
    @Column("varchar",{ 
        nullable:false,
        length:255, 
        })
    groupName:string;
        
    @IsInt()
    @Column("int",{ 
        nullable:false,
        default: 1, 
        })
    groupLevel:number;
        
    @Length(1, 5)
    @Column("varchar",{ 
        nullable:false,
        length: 5,
        default: "BAT", 
        })
    groupStudies:string;
        
    @Length(1, 255)
    @Column("varchar",{ 
        nullable:false,
        length:255,
        default:"A", 
        })
    groupLetter:string;
        
    @IsOptional()
    @Min(0)
    @Column("int", { 
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
        
    @IsOptional()
    @Validate(JsonStringValidator)
    @Column("longtext",{ 
        nullable: true, 
        })
    gopts: string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    thmcss:string;
        
    // Many groups may be created by one user
    @ManyToOne((type)=> UserModel, (user) => user.groupsCreated )
    @JoinColumn({name: "idUserCreator"})
    creator: UserModel;
}