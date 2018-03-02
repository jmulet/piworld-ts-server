import { IsDate, IsNotEmpty, Validate } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { IntRangeValidator } from '../../main.app/validators/IntRangeValidator';
import { CourseModel } from './CourseModel';
import { UserModel } from '../../main.app/entities/UserModel';

@Entity("class_chat")
export class ChatModel {

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
   
    //This is idRecipient, 0 if goes to the entire idGroup.
    @Column("int")
    isFor: number;

    @Validate(IntRangeValidator, [0,1])
    @Column("tinyint")
    parents: number;

    @ManyToOne((type) => CourseModel, (course)=>course._chats)
    @JoinColumn({name: "idCourse"})
    _course: CourseModel;    

    @ManyToOne((type) => UserModel, (user)=>user._chats)
    @JoinColumn({name: "idUser"})
    _user: UserModel;    

}