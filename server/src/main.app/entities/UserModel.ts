import { PasswordValidator } from '../validators/PasswordValidator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate, AfterUpdate, CreateDateColumn } from 'typeorm';

import { SchoolModel } from './SchoolModel';
import { JsonStringValidator } from '../validators/JsonStringValidator';
import { Validate, IsInt, Min, Max, IsDate, IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { RoleValidator } from '../validators/RoleValidator';
import { GroupsModel } from './classroom/GroupsModel';
import { IntRangeValidator } from '../validators/IntRangeValidator';
import { LoginsModel } from './LoginsModel';
import { UploadModel } from './classroom/UploadModel';
import { CommentModel} from './classroom/CommentModel';
import { ChallengesQuizzModel } from './classroom/ChallengesQuizzModel';
import { BadgesModel } from './classroom/BadgesModel';
import { RatingModel } from './classroom/RatingModel';
import { ChatModel } from './classroom/ChatModel';
import { PdaBadgesModel } from './pda/PdaBadgesModel';
import { PdaActivityGrades } from './pda/PdaActivityGrades';
import { OffspringModel } from './OffspringModel';
import { PdaMessageModel } from './pda/PdaMessageModel';


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
        
    @IsInt()
    @Column({default: 1})
    idSchool: number;

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
    
    @Column("text", {select: false})
    @Validate(PasswordValidator, [4, true])
    password: string;
    
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
    recovery: string;

    @CreateDateColumn()
    created: Date;
 
    @Validate(IntRangeValidator, [-1, 1])
    @Column("tinyint", {default: 1})
    valid: number;
    
    @IsOptional()
    @Column("json", {nullable: true})
    uopts: any;

    @Column("tinyint", {nullable: true, select: false})
    sdr: number

    @Column("datetime", {nullable: true, select: false})
    sdd: Date

    // Many users have associated a "school" object
    @ManyToOne((type) => SchoolModel, (school) => school._members, {onDelete: "CASCADE"})
    @JoinColumn({name: "idSchool"})
    _school: SchoolModel;

    // A user (which is PARENTS role) may contain many "offspring"
    @OneToMany((type) => OffspringModel, offspring => offspring._parent)
    _offspring: OffspringModel[]


    // A user may have created a number of "groups"
    @OneToMany((type) => GroupsModel, group => group._creator)
    _groupsCreated: GroupsModel[]

    // A user may have multiple logins
    @OneToMany(type => LoginsModel, (login)=> login._user)
    _logins: LoginsModel[];

    @OneToMany((type) => UploadModel, (upload) => upload._user)    
    _uploads: UploadModel[];

    @OneToMany((type) => CommentModel, (comment) => comment._user)    
    _comments: CommentModel[];

    @OneToMany((type) => ChallengesQuizzModel, (challenge) => challenge._user)    
    _challengeUsers: ChallengesQuizzModel[];

    @OneToMany((type) => BadgesModel, (badge) => badge._user)    
    _badgesOwned: BadgesModel[];

    @OneToMany((type) => BadgesModel, (badge) => badge._creator)    
    _badgesCreated: BadgesModel[];
    
    @OneToMany((type) => RatingModel, (rating) => rating._user)    
    _ratings: RatingModel[];

    @OneToMany((type)=> ChatModel, (chat) => chat._user)
    _chats: ChatModel[];

    @OneToMany((type)=> PdaMessageModel, (message) => message._user)
    _pdaMessages: PdaMessageModel[];
 
    @OneToMany((type)=> PdaBadgesModel, (badge) => badge._user)
    _pdaBadges: PdaBadgesModel[];

    @OneToMany((type)=> PdaActivityGrades, (grade) => grade._user)
    _pdaGrades: PdaActivityGrades[];

    @OneToMany((type)=> OffspringModel, (offspring) => offspring._child)
    _childParents: OffspringModel[];
 
    @BeforeInsert()
    onInsert() {
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