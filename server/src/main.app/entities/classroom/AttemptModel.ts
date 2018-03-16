import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { QuestionModel } from './QuestionModel';
import { SectionAssignModel } from './SectionAssignModel';

@Entity("class_attempts")
export class AttemptModel {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idSectionAssign: number

    @Column("int")
    idUser: number

    @Column("datetime")
    attemptStart: Date;

    @Column("datetime")
    attemptEnd: Date;

    @Column("tinyint")
    done: number;

    @Column("int", {
        nullable: false,
        default: 0
    })
    score: number;

    @Column("int", {
        nullable: false,
        default: 0
    })
    level: number;

    @ManyToOne((type)=>(SectionAssignModel), (sectionAssign)=>sectionAssign._attempts, {onDelete: "CASCADE"})
    @JoinColumn({name: "idSectionAssign"})
    _sectionAssign: SectionAssignModel;
    
    @OneToMany((type)=>(QuestionModel), (question)=>question._attempt)
    _questions: QuestionModel[]
}
