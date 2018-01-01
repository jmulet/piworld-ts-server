import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SchoolModel } from './SchoolModel';


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

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;

    @Column("int")
    idRole: number;

    @Column("longtext")
    username: string;
    
    @Column("longtext")
    fullname: string;
    
    @Column("text")
    password: string;
    
    @Column("text", {
        nullable: true
    })
    passwordParents: string;
    
    @Column("text", {
        nullable: true
    })
    emailParents: string;
    
    @Column({default: 0})
    mustChgPwd: number;
    
    @Column("text", {
        nullable: true
    })
    email: string;
    
    @Column("text", {
        nullable: true
    })
    emailPassword: string;
    
    @Column("text", {
        nullable: true
    })
    phone: string;
    
    @Column({default: 0})
    schoolId: number;
    
    @Column("date", {nullable: true})
    created: Date;
 
    @Column("int", {default: 1})
    valid: number;
    
    @Column("longtext", {nullable: true})
    uopts: string = "{}";

    // A user has associated a "school" object
    @OneToOne((type) => SchoolModel, (school) => school.id )
    @JoinColumn({name: "schoolId"})
    school: SchoolModel;
 
}