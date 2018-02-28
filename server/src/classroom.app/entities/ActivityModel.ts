import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';

import { SubjectModel } from '../../main.app/entities/SubjectModel';
import { RatingModel } from '.';

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

@Entity("activities")
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

    @Column("int")
    difficulty: number;

    @Column("varchar", {
        nullable: true
    })
    icon: string;

    @Column("varchar", {
        nullable: true
    })
    ytid: string;

    @Column("tinyint", {
        nullable: false,
        default: 0
    })
    ytqu: number;

    @Column("varchar", {
        nullable: true
    })
    ggbid: string;

    @Column("int", {
        nullable: false,
        default: 0
    })
    hasAct: number;

    @Column("tinyint", {
        nullable: true
    })
    createjs: number;

    @Column("int", {
        nullable: false,
        default: 0
    })
    counter: number;

    // Many activities belong to one subject
    @ManyToOne( (type) => SubjectModel, (subject) => subject.activities, {onDelete: "CASCADE"})
    @JoinColumn({name: "idSubject"})
    subject: SubjectModel;

    @OneToMany( (type)=> RatingModel, (rating) => rating.activity)
    ratings: RatingModel[];

    @BeforeInsert()
    setCreationDate() {
        this.createdWhen = new Date();
    }
}