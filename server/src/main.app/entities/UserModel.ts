import { PasswordValidator } from '../validators/PasswordValidator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate, AfterUpdate } from 'typeorm';

import { SchoolModel } from './SchoolModel';
import { JsonStringValidator } from '../validators/JsonStringValidator';
import { Validate, IsInt, Min, Max, IsDate, IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { RoleValidator } from '../validators/RoleValidator';
import { GroupsModel } from './GroupsModel';
import { IntRangeValidator } from '../validators/IntRangeValidator';
import { LoginsModel } from './LoginsModel';


export abstract class UserRoles {
    static admin = 0;
    static teacher_admin = 50; // 100 before
    static teacher = 100;
    static teacher_nonediting = 150; //105 before
    static student = 200;
    static guest = 400;
    static parents = 500;
    static TEACHERS = [UserRoles.teacher, UserRoles.teacher_admin, UserRoles.teacher_nonediting];
    static ADMINS = [UserRoles.admin, UserRoles.teacher_admin];
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
    @MaxLength(255)
    @Column("varchar", {unique: true})
    username: string;
    
    @IsNotEmpty()
    @Column("longtext")
    fullname: string;
    
    @IsNotEmpty()
    @Column("text")
    @Validate(PasswordValidator, [4, true])
    password: string;
    
    @IsOptional()
    @Column("text", {
        nullable: true
    })
    @Validate(PasswordValidator, [4, true])
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
    
    @Column("date", {nullable: true})
    created: Date;
 
    @Validate(IntRangeValidator, [-1, 1])
    @Column("tinyint", {default: 1})
    valid: number;
    
    @Validate(JsonStringValidator)
    @Column("longtext", {nullable: true})
    uopts: string = "{}";

    // Many users have associated a "school" object
    @ManyToOne((type) => SchoolModel, (school) => school.members, {onDelete: "CASCADE"})
    @JoinColumn({name: "schoolId"})
    school: SchoolModel;

    // A user may have created a number of "groups"
    @OneToMany((type)=>GroupsModel, group => group.creator)
    groupsCreated: GroupsModel[]

    // A user may have multiple logins
    @OneToMany(type => LoginsModel, (login)=> login.user)
    logins: LoginsModel[];

 
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