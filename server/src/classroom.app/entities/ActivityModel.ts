import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SubjectModel } from '../../main.app/entities/SubjectModel';

export enum ActivityTypes {
    basic = 0
}

export enum ActivityShareTypes {
    public = 2
}

@Entity("activities")
export class ActivityModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("text", {
        nullable: true,
    })
    levels: string;

    @Column("int", {
        nullable: false,
        default: 1
    })
    idSubject: number;

    @IsNotEmpty()
    @Column("text", {
        nullable: true,
    })
    activity: string;

    @Column("varchar", {
        length: 11,
        nullable: false,
        default: ActivityTypes.basic
    })
    activityType: number;

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
    createdWhen: Date;

    @Column("text")
    description: string;

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

}