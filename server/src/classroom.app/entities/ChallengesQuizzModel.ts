import { IsDate, Validate } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IntRangeValidator } from '../../main.app/validators/IntRangeValidator';
import { ChallengesModel } from './ChallengesModel';
import { UserModel } from '../../main.app/entities/UserModel';
import { CourseModel } from './CourseModel';


@Entity("class_challenges_quizz")
export class ChallengesQuizzModel {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idChallenge: number; 

    @Column("int")
    idUser: number;

    @Column("int")
    idCourse: number;

    @IsDate()
    @Column("datetime")
    when: Date;

    @Column("longtext")
    answer: string;

    @Validate(IntRangeValidator, [0,1])
    @Column("tinyint")
    valid: number
    
    @ManyToOne( (type)=> ChallengesModel, (challenge) => challenge._challengeUsers)
    @JoinColumn({name: "idChallenge"})
    _challenge: ChallengesModel;

    @ManyToOne( (type)=> UserModel, (user) => user._challengeUsers)
    @JoinColumn({name: "idUser"})
    _user: UserModel;

    @ManyToOne( (type)=> CourseModel, (course) => course._challengeUsers)
    @JoinColumn({name: "idCourse"})
    _course: CourseModel;
         
}