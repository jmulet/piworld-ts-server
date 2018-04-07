import { IsInt, IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UnitModel } from './UnitModel';
import { SubjectModel } from '../SubjectModel';
import { GroupsModel } from './GroupsModel';
import { ChallengesQuizzModel } from './ChallengesQuizzModel';
import { BadgesModel } from './BadgesModel';
import { ChatModel } from './ChatModel';
import { BooksAssignModel } from '../books/BooksAssignModel';
import { PdaMessageModel } from '../pda/PdaMessageModel';
import { LevelsModel } from '../LevelsModel';

@Entity("class_courses")
export class CourseModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @IsInt()
    @Column("int")
    idLevel: number;
 
    @Column("int", {
        nullable: false,
        default: "1",
    })
    idSubject: number;

    @Column("int", {
        nullable: false,
        default: "0",
    })
    idUserCreator: number;

    @Column("int", {
        default: 2017
    })
    year: number;      

    @IsNotEmpty()
    @Column("varchar")
    name: string;
    
    @Column("longtext")
    description: string;


    @Column("int", {
        nullable: false,
        default: "0",
    })
    currentUnit: number;

    @Column("varchar", {
        nullable: true,
        length: 255,
    })
    enrollPassword: string;

    @Column("tinyint", {nullable: true, select: false})
    sdr: number

    @Column("datetime", {nullable: true, select: false})
    sdd: Date

    @ManyToOne((type)=> SubjectModel, (subject) => subject._courses, {onDelete: "CASCADE"})
    @JoinColumn({name: "idSubject"})
    _subject: SubjectModel;

    @ManyToOne((type)=> LevelsModel, (level) => level._courses, {onDelete: "CASCADE"})
    @JoinColumn({name: "idLevel"})
    _level: LevelsModel;

    @OneToMany((type)=> UnitModel, (unit) => unit._course)
    _units: UnitModel[];

    @OneToMany((type)=> GroupsModel, (courseGroups) => courseGroups._course, {cascade: ["insert"]})
    _courseGroups: GroupsModel[];

    @OneToMany((type)=> ChallengesQuizzModel, (challenges) => challenges._course)
    _challengeUsers: GroupsModel[];

    @OneToMany((type)=> BadgesModel, (badge) => badge._course)
    _badges: BadgesModel[];
    
    @OneToMany((type)=> ChatModel, (chat) => chat._course)
    _chats: ChatModel[];

    @OneToMany((type)=> PdaMessageModel, (message) => message._course)
    _pdaMessages: PdaMessageModel[];

    @OneToMany((type)=> BooksAssignModel, (bookAssign) => bookAssign._course)
    _bookAssignments: BooksAssignModel[]
}