import { PasswordValidator } from '../validators/PasswordValidator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate, AfterUpdate } from 'typeorm';

import { SchoolModel } from './SchoolModel';
import { JsonStringValidator } from '../validators/JsonStringValidator';
import { Validate, IsInt, Min, Max, IsDate, IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { RoleValidator } from '../validators/RoleValidator';
import { GroupsModel } from '../../classroom.app/entities/GroupsModel';
import { IntRangeValidator } from '../validators/IntRangeValidator';
import { LoginsModel } from './LoginsModel';
import { UploadModel, CommentModel, ChallengesQuizzModel, BadgesModel, RatingModel, ChatModel } from '../../classroom.app/entities';
import { PdaBadgesModel, PdaActivityGrades } from '../../pda.app/entities';


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

@Entity("pw_users")
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
    
    @IsOptional()
    @Column("json", {nullable: true})
    uopts: any;

    // Many users have associated a "school" object
    @ManyToOne((type) => SchoolModel, (school) => school._members)
    @JoinColumn({name: "schoolId"})
    _school: SchoolModel;

    // A user may have created a number of "groups"
    @OneToMany((type) => GroupsModel, group => group._creator, {onDelete: "CASCADE", cascade: ["remove"]})
    _groupsCreated: GroupsModel[]

    // A user may have multiple logins
    @OneToMany(type => LoginsModel, (login)=> login._user, {onDelete: "CASCADE", cascade: ["remove"]})
    _logins: LoginsModel[];

    @OneToMany((type) => UploadModel, (upload) => upload._user, {onDelete: "CASCADE", cascade: ["remove"]})    
    _uploads: UploadModel[];

    @OneToMany((type) => CommentModel, (comment) => comment._user, {onDelete: "CASCADE", cascade: ["remove"]})    
    _comments: CommentModel[];

    @OneToMany((type) => ChallengesQuizzModel, (challenge) => challenge._user, {onDelete: "CASCADE", cascade: ["remove"]})    
    _challengeUsers: ChallengesQuizzModel[];

    @OneToMany((type) => BadgesModel, (badge) => badge._user, {onDelete: "CASCADE", cascade: ["remove"]})    
    _badgesOwned: BadgesModel[];

    @OneToMany((type) => BadgesModel, (badge) => badge._creator, {onDelete: "CASCADE", cascade: ["remove"]})    
    _badgesCreated: BadgesModel[];
    
    @OneToMany((type) => RatingModel, (rating) => rating._user, {onDelete: "CASCADE", cascade: ["remove"]})    
    _ratings: RatingModel[];

    @OneToMany((type)=> ChatModel, (chat) => chat._user, {onDelete: "CASCADE", cascade: ["remove"]})
    _chats: ChatModel[];
 
    @OneToMany((type)=> PdaBadgesModel, (badge) => badge._user, {onDelete: "CASCADE", cascade: ["remove"]})
    _pdaBadges: PdaBadgesModel[];

    @OneToMany((type)=> PdaActivityGrades, (grade) => grade._user, {onDelete: "CASCADE", cascade: ["remove"]})
    _pdaGrades: PdaActivityGrades[];
 
    @BeforeInsert()
    setCreationDate() {
        this.created = new Date();
        this.uopts = {};
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