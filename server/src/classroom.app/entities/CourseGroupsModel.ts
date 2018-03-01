import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GroupsModel } from '../../main.app/entities/GroupsModel';
import { CourseModel } from './CourseModel';

@Entity("courses_groups")
export class CourseGroupsModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idCourse: number;      

    @Column("int")
    idGroup: number;      
    
    @ManyToOne((type)=> CourseModel, (course) => course.courseGroups, {cascade: ["insert", "update", "remove"], onDelete: "CASCADE"})
    @JoinColumn({name: "idCourse"})
    course: CourseModel;

    //A group can be in many courses; or a course can contain many groups
    @ManyToOne((type)=> GroupsModel, {cascade: ["insert", "update", "remove"], onDelete: "CASCADE"})
    @JoinColumn({name: "idGroup"})
    group: GroupsModel;
}