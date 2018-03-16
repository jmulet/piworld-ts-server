import { GroupsModel } from './classroom/GroupsModel';
import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength, IsNotEmpty } from "class-validator";
import { ActivityModel } from './classroom/ActivityModel';
import { CourseModel } from './classroom/CourseModel';
import { SubjectModel } from './SubjectModel';


@Entity("pw_subjects_category")
export class SubjectCategoryModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idSubject: number;

    @IsNotEmpty()
    @MaxLength(255)
    @Column("varchar", {
        nullable: false,
        length: 255 
    })
    name: string;

    @IsNotEmpty()
    @Column("longtext")
    longname: string;
 
    // One subject has many activities
    @ManyToOne((type) => SubjectModel, (subject) => subject._categories, {onDelete: "CASCADE"})  
    @JoinColumn({name: "idSubject"})
    _subject: SubjectModel;
 
}
