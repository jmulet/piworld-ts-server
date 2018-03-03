import { IsInt, IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UnitModel } from './UnitModel';
import { SubjectModel } from '../../main.app/entities/SubjectModel';
import { GroupsModel } from './GroupsModel';
import { ChallengesQuizzModel, BadgesModel, ChatModel } from '.';
import { BooksAssignModel } from '../../books.app/entities/BooksAssignModel';
import { PdaMessageModel } from '../../pda.app/entities/PdaMessageModel';

@Entity("class_courses")
export class CourseModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    year: number;      

    @IsNotEmpty()
    @Column("varchar")
    name: string;
    
    @Column("longtext")
    description: string;

    @IsInt()
    @Column("int", {
        nullable: false,
        default: 1,
    })
    courseLevel: number;

    @Length(1, 5)
    @Column("varchar", {
        nullable: false,
        length: 5,
        default: "BAT",
    })
    courseStudies: string;

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

    @ManyToOne((type)=> SubjectModel, (subject) => subject._courses)
    @JoinColumn({name: "idSubject"})
    _subject: SubjectModel;

    @OneToMany((type)=> UnitModel, (unit) => unit._course, {onDelete: "CASCADE", cascade: ["remove"]})
    _units: UnitModel[];

    @OneToMany((type)=> GroupsModel, (courseGroups) => courseGroups._course, {onDelete: "CASCADE", cascade: ["remove"]})
    _courseGroups: GroupsModel[];

    @OneToMany((type)=> ChallengesQuizzModel, (challenges) => challenges._course, {onDelete: "CASCADE", cascade: ["remove"]})
    _challengeUsers: GroupsModel[];

    @OneToMany((type)=> BadgesModel, (badge) => badge._course, {onDelete: "CASCADE", cascade: ["remove"]})
    _badges: BadgesModel[];
    
    @OneToMany((type)=> ChatModel, (chat) => chat._course, {onDelete: "CASCADE", cascade: ["remove"]})
    _chats: ChatModel[];

    @OneToMany((type)=> PdaMessageModel, (message) => message._course, {onDelete: "CASCADE", cascade: ["remove"]})
    _pdaMessages: PdaMessageModel[];

    @OneToMany((type)=> BooksAssignModel, (bookAssign) => bookAssign._course, {onDelete: "CASCADE", cascade: ["remove"]})
    _bookAssignments: BooksAssignModel[]
}