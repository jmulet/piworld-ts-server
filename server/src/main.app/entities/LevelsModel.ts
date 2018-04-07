import { IsInt, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CourseModel } from './classroom/CourseModel';

@Entity("pw_levels")
export class LevelsModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
         
    @IsInt()
    @Column("tinyint")
    level: number;

    @MaxLength(255)
    @Column("varchar")
    studies: string;

    @OneToMany(type => CourseModel, (course)=> course._level)
    _courses: CourseModel[];
    
}