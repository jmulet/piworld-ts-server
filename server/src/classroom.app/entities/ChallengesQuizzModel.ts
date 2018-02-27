import { IsDate, Validate } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IntRangeValidator } from '../../main.app/validators/IntRangeValidator';
import { ChallengesModel } from './ChallengesModel';


@Entity("challenges_quizz")
export class ChallengesQuizzModel {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idChallenge: number; 

    @Column("int")
    idUser: number;

    @IsDate()
    @Column("datetime")
    when: Date;

    @Column("longtext")
    answer: string;

    @Validate(IntRangeValidator, [0,1])
    @Column("tinyint")
    valid: number

    
    @ManyToOne( (type)=> ChallengesModel, (challenge) => challenge.challengeUsers, {onDelete: "CASCADE", cascadeAll: true})
    @JoinColumn({name: "idChallenge"})
    challenge: ChallengesModel;
         
}