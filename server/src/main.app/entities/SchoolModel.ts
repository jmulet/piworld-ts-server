import { IsEmail, IsInt, IsNotEmpty, Max, Min, Validate, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate, AfterUpdate } from 'typeorm';

import { I18n } from '../services/I18n';
import { LangValidator } from '../validators/LangValidator';
import { UserModel } from './UserModel';
import { IntRangeValidator } from '../validators/IntRangeValidator';

@Entity("pw_schools") 
export class SchoolModel {
    changed: boolean;

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
    
    @IsNotEmpty()
    @Column("varchar",{ 
        nullable:false,
        length:255,
        unique: true 
        })
    schoolName:string;

    @IsNotEmpty()
    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    professorName:string;
        
    @IsEmail()
    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    professorEmail:string;
        
    @IsOptional()
    @Validate(LangValidator)
    @Column("varchar",{ 
        nullable: true,
        length: 5,
        default: I18n.DEFAULT_LANG, 
        })
    language:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255, 
        })
    enrollPassword:string;
        
    @Validate(IntRangeValidator, [0, 1])
    @Column("tinyint",{ 
        nullable:false,
        default: 0, 
        })
    canEnroll:number;
        
    @Validate(IntRangeValidator, [0, 1])
    @Column("tinyint",{ 
        nullable:false,
        default: 1, 
        })
    canPublish:number;

    // One School may have many members
    @OneToMany((type) => UserModel, (user) => user._school)
    _members: UserModel[];

    @BeforeInsert()
    checkEmails() {
        if (this.professorEmail === ""){
            this.professorEmail = null;
        }
    }

    @BeforeUpdate()
    setChangedBefore() {
        this.changed = false;
    }

    @AfterUpdate()
    setChangedAfter() {
        this.changed = true;
    }
}