import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';

import { SubjectModel } from '../SubjectModel';
import { RatingModel } from './RatingModel';
import { SectionModel } from './SectionModel';
import { CommentModel } from './CommentModel';

export enum ActivityTypes {
    video = 'V',
    upload = 'U',
    quizz = 'Q',
    advanced = 'A'
}

export enum ActivityShareTypes {
    private = 0,
    protected = 1,
    public = 2
}

export interface JSONi18n {
    ca: string,
    es: string,
    en: string
}

export interface ActivityParams {    
    ytid: string;
    ytqu: number;
    ggbid: string;
    hasAct: number;
    createjs: number;
}

@Entity("class_activities")
export class ActivityModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("json", {
        nullable: true,
    })
    levels: string[];

    @IsNotEmpty()
    @Column("int", {
        nullable: false,
        default: 1
    })
    idSubject: number;

    @IsNotEmpty()
    @Column("json", {
        nullable: true,
    })
    activity: JSONi18n;

    @Column("varchar", {
        length: 11,
        nullable: false,
        default: ActivityTypes.video
    })
    activityType: string;

    @Column("tinyint", {
        nullable: false,
        default: ActivityShareTypes.public
    })
    share: number;

    @IsNotEmpty()
    @Column("varchar", {
        length: 255,
        nullable: false
    })
    createdBy: string;

    @Column("datetime", {
        nullable: false
    })
    protected createdWhen: Date;

    @Column("json")
    description: JSONi18n;

    @Column("int", {
        default: 0
    })
    difficulty: number;

    @Column("varchar", {
        nullable: true
    })
    icon: string;

    @Column("json", {
        nullable: true
    })
    params: ActivityParams;

    @Column("int", {
        nullable: false,
        default: 0
    })
    counter: number;

    @Column("tinyint", {nullable: true, select: false})
    sdr: number

    @Column("datetime", {nullable: true, select: false})
    sdd: Date

    // Many activities belong to one subject
    @ManyToOne( (type) => SubjectModel, (subject) => subject._activities, {onDelete: "CASCADE"})
    @JoinColumn({name: "idSubject"})
    _subject: SubjectModel;

    @OneToMany( (type)=> RatingModel, (rating) => rating._activity)
    _ratings: RatingModel[];

    @OneToMany( (type)=> SectionModel, (section) => section._activity)
    _sections: SectionModel[];

    @OneToMany( (type)=> CommentModel, (comments) => comments._activity)
    _comments: CommentModel[];

    @BeforeInsert()
    setCreationDate() {
        this.createdWhen = new Date();
    }
}