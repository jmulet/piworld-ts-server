import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QuestionModel } from './QuestionModel';

@Entity("class_questions_answers")
export class AnswerModel {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idQuestion: number

    @Column("text")
    answer: string;

    @Column("tinyint")
    isCorrect: number;
    
    @Column("int")
    seconds: number;
    
    @ManyToOne((type)=>(QuestionModel), (question)=>question._answers, {onDelete: "CASCADE"})
    @JoinColumn({name: "idQuestion"})
    _question: QuestionModel;
}
