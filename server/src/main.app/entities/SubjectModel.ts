import { GroupsModel } from '../../classroom.app/entities/GroupsModel';
import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength, IsNotEmpty } from "class-validator";
import { ActivityModel } from '../../classroom.app/entities/ActivityModel';
import { CourseModel } from '../../classroom.app/entities';
import { SubjectCategoryModel } from './SubjectCategoryModel';


@Entity("pw_subjects")
export class SubjectModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @IsNotEmpty()
    @MaxLength(11)
    @Column("varchar", {
        nullable: false,
        length: 11,
        default: "",
    })
    name: string;

    @IsNotEmpty()
    @MaxLength(255)
    @Column("varchar", {
        nullable: true,
        length: 255,
    })
    longname: string;
 
    // One subject has many activities
    @OneToMany((type) => ActivityModel, (activity) => activity._subject, {onDelete: "CASCADE", cascade: ["remove"]})  
    _activities: ActivityModel[];

    // Relation between courses and subjects
    @OneToMany((type)=>CourseModel, (course)=>course._subject, {onDelete: "CASCADE", cascade: ["remove"]})
    _courses: CourseModel[]

    @OneToMany((type)=>SubjectCategoryModel, (category)=>category._subject, {onDelete: "CASCADE", cascade: ["remove"]})
    _categories: CourseModel[]
}
