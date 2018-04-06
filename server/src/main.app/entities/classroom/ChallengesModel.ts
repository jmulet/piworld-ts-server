import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { ChallengesQuizzModel } from './ChallengesQuizzModel';
import { UserModel } from '../UserModel';


@Entity("class_challenges")
export class ChallengesModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idUserCreator: number;   

    //Old table was w: week; now replaced by date interval 

    @IsDate()
    @Column("date")
    fromDay: Date;      

    @IsDate()
    @Column("date")
    toDay: Date;      

    /**
     * Level must must match courseLevel + courseStudies in course table
     */
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

    @OneToMany( (type)=> ChallengesQuizzModel, (challengeQuizz) => challengeQuizz._challenge)
    _challengeUsers: ChallengesQuizzModel[];

    @ManyToOne((type) => UserModel, (user) => user._challengesCreated, {onDelete: "CASCADE"})
    @JoinColumn({name: "idUserCreator"})
    _user: UserModel;

}