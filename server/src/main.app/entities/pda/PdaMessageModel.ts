import { IsDate, IsNotEmpty, Validate } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { IntRangeValidator } from '../../validators/IntRangeValidator';
 
import { UserModel } from '../UserModel';
import { CourseModel } from '../classroom/CourseModel';

@Entity("pda_messages")
export class PdaMessageModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idCourse: number;

    @Column("int")
    idUser: number;
 
    @IsDate()
    @Column("datetime")
    day: Date;      

    @IsNotEmpty()
    @Column("longtext")
    msg: string;
   
    //This is idRecipient, 0 if goes to the entire idCourse.
    @Column("int")
    isFor: number;
 
    @ManyToOne((type) => CourseModel, (course)=>course._pdaMessages, {onDelete: "CASCADE"})
    @JoinColumn({name: "idCourse"})
    _course: CourseModel;    

    @ManyToOne((type) => UserModel, (user)=>user._pdaMessages, {onDelete: "CASCADE"})
    @JoinColumn({name: "idUser"})
    _user: UserModel;    

}