import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserModel } from '../../main.app/entities/UserModel';
import { ActivityModel } from './ActivityModel';

@Entity("class_comments")
export class CommentModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idUser: number;

    @Column("int")
    idActivity: number;

    @IsDate()
    @Column("datetime")
    day: Date;      

    @IsNotEmpty()
    @Column("longtext")
    comment: string;

    @ManyToOne((type) => UserModel, (users)=>users._comments)
    @JoinColumn({name: "idUser"})
    _user: UserModel;
 
    @ManyToOne((type) => ActivityModel, (activity)=>activity._comments)
    @JoinColumn({name: "idActivity"})
    _activity: ActivityModel;    
}