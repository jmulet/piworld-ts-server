import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate, AfterUpdate } from 'typeorm';

import { SchoolModel } from './SchoolModel';
import { JsonStringValidator } from '../validators/JsonStringValidator';
import { Validate, IsInt, Min, Max, IsDate, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { RoleValidator } from '../validators/RoleValidator';
import { GroupsModel } from './GroupsModel';
import { IntRangeValidator } from '../validators/IntRangeValidator';


export enum UserRoles {
    admin = 0,
    teacher_admin = 50, // 100 before
    teacher = 100,
    teacher_nonediting = 150, //105 before
    student = 200,
    guest = 400,
    parents = 500
}

@Entity("users")
export class UserModel {
    changed: boolean;

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;

    @Validate(RoleValidator)
    @Column("int")
    idRole: number;

    @IsNotEmpty()
    @Column("longtext")
    username: string;
    
    @IsNotEmpty()
    @Column("longtext")
    fullname: string;
    
    @IsNotEmpty()
    @Column("text")
    password: string;
    
    @IsOptional()
    @Column("text", {
        nullable: true
    })
    passwordParents: string;
    
    @IsOptional()
    @IsEmail()
    @Column("text", {
        nullable: true
    })
    emailParents: string;
    
    @IsOptional()
    @Validate(IntRangeValidator, [0, 1])
    @Column({default: 0})
    mustChgPwd: number;
    
    @IsOptional()
    @IsEmail()
    @Column("text", {
        nullable: true
    })
    email: string;
    
    @IsOptional()
    @Column("text", {
        nullable: true
    })
    emailPassword: string;
    
    @IsOptional()
    @Column("text", {
        nullable: true
    })
    phone: string;
    
    @IsInt()
    @Column({default: 1})
    schoolId: number;
    
    @IsOptional()
    @IsDate()
    @Column("date", {nullable: true})
    created: Date;
 
    @Validate(IntRangeValidator, [-1, 1])
    @Column("tinyint", {default: 1})
    valid: number;
    
    @Validate(JsonStringValidator)
    @Column("longtext", {nullable: true})
    uopts: string = "{}";

    // Many users have associated a "school" object
    @ManyToOne((type) => SchoolModel, (school) => school.members, {cascadeRemove: false})
    @JoinColumn({name: "schoolId"})
    school: SchoolModel;

    // A user may have created a number of "groups"
    @OneToMany((type)=>GroupsModel, group => group.creator)
    groupsCreated: GroupsModel[]
 
    @BeforeInsert()
    setCreationDate() {
        this.created = new Date();
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