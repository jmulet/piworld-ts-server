import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ActivityModel } from './ActivityModel';
import { UserModel } from '../../main.app/entities/UserModel';

@Entity("class_ratings")
export class RatingModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idActivity: number;

    @Column("int")
    idUser: number;

    @Column("tinyint", {
        default: 3
    })
    rate: number;      

    @Column("tinyint", {
        default: 3
    })
    vrate: number;

    @ManyToOne( (type)=> ActivityModel, (activity) => activity._ratings,)
    @JoinColumn({name: "idActivity"})
    _activity: ActivityModel;

    @ManyToOne( (type)=> UserModel, (user) => user._ratings)
    @JoinColumn({name: "idUser"})
    _user: UserModel;
}