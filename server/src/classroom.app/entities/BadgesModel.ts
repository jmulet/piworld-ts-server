import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserModel } from '../../main.app/entities/UserModel';
import { CourseModel } from './CourseModel';


@Entity("class_badges")
export class BadgesModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idUser: number;

    @Column("int")
    idCreator: number;

    @Column("int")
    idCourse: number;

    @Column("tinyint", {
        nullable: true
    })
    type: number;

    @IsNotEmpty()
    @IsDate()
    @Column("date", {
        nullable: false,
    })
    day: Date;

    @Column("int", {
        nullable: false,
        default: 0
    })
    rscore: number;

    @ManyToOne( (type) => UserModel, (user) => user._badgesOwned)
    @JoinColumn({name: "idUser"})
    _user: UserModel;

    @ManyToOne( (type) => UserModel, (creator) => creator._badgesCreated)
    @JoinColumn({name: "idCreator"})
    _creator: UserModel;

    @ManyToOne( (type) => CourseModel, (course) => course._badges)
    @JoinColumn({name: "idCourse"})
    _course: CourseModel;

}