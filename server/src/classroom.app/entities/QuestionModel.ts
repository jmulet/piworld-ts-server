import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AttemptModel } from './AttemptModel'; 
import { AnswerModel } from './AnswerModel';

@Entity("class_questions")
export class QuestionModel {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idAttempt: number;
    
    @Column("longtext")
    question: string;
    
    @Column("longtext")
    rightAnswer: string;
    
    @Column("int", {
        default: 0
    })
    seconds: number;
    
    @Column("int", {
        default: 0
    })
    score: number;
    
    @Column("varchar", {
        default: 'g'
    })
    category: string;

    @Column("tinyint", {
        default: 0
    })
    level: number;
    
    @Column("tinyint", {
        default: 0
    })
    askTheory: number;
    
    @Column("tinyint", {
        default: 0
    })
    askHelp: number;

    @Column("tinyint", {
        default: 0
    })
    askAnswer: number;
 
    @ManyToOne((type)=>(AttemptModel), (attempt)=>attempt._questions)
    @JoinColumn({name: "idAttempt"})
    _attempt: AttemptModel;

    @OneToMany((type)=>(AnswerModel), (answer)=>answer._question, {onDelete: "CASCADE", cascade: ["remove"]})
    _answers: AnswerModel[]
}
