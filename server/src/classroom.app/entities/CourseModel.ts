import { IsInt, IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UnitModel } from '.';
import { SubjectModel } from '../../main.app/entities';
import { CourseGroupsModel } from './CourseGroupsModel';

@Entity("courses")
export class CourseModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    year: number;      

    @IsNotEmpty()
    @Column("varchar")
    name: string;
    
    @Column("longtext")
    description: string;

    @IsInt()
    @Column("int", {
        nullable: false,
        default: 1,
    })
    courseLevel: number;

    @Length(1, 5)
    @Column("varchar", {
        nullable: false,
        length: 5,
        default: "BAT",
    })
    courseStudies: string;

    @Column("int", {
        nullable: false,
        default: "1",
    })
    idSubject: number;

    @Column("int", {
        nullable: false,
        default: "0",
    })
    idUserCreator: number;

    @Column("int", {
        nullable: false,
        default: "0",
    })
    currentUnit: number;

    @Column("varchar", {
        nullable: true,
        length: 255,
    })
    enrollPassword: string;

    @ManyToOne((type)=> SubjectModel, (subject) => subject, {cascade: ["remove"]})
    @JoinColumn({name: "idSubject"})
    subject: SubjectModel;

    @OneToMany((type)=> UnitModel, (unit) => unit.course, {cascade: ["insert", "update"]})
    units: UnitModel[];

    @OneToMany((type)=> CourseGroupsModel, (courseGroups) => courseGroups.course, {cascade: ["insert", "update"]})
    courseGroups: CourseGroupsModel[];

}