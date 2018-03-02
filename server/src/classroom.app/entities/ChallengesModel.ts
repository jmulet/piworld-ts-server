import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ChallengesQuizzModel } from './ChallengesQuizzModel';


@Entity("class_challenges")
export class ChallengesModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    //Old table was w: week; now replaced by date
    // @Column("int")
    // w: number;      

    @IsDate()
    @Column("date")
    day: Date;      

    @IsNotEmpty()
    @Column("varchar", {
        nullable: false
    })
    level: string;

    @IsNotEmpty()
    @Column("longtext")
    formulation: string;

    @Column("int", {
        nullable: false,
        default: 0
    })
    score: number;

    @Column("longtext")
    ranswer: string;

    @OneToMany( (type)=> ChallengesQuizzModel, (challengeQuizz) => challengeQuizz._challenge, {onDelete: "CASCADE", cascade: ["remove"]})
    _challengeUsers: ChallengesQuizzModel[];
}