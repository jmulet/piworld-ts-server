import { IsNotEmpty, Validate } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { GroupsModel } from './GroupsModel';
import { IntRangeValidator } from '../../validators/IntRangeValidator';
import { SectionModel } from './SectionModel';
import { CourseModel } from './CourseModel';

export enum UnitVisibility {
    hidden = 0,
    collapsed = 1,
    auto = 2,
    expanded = 3
}

@Entity("class_units")
export class UnitModel {

    constructor(unit?: string, idCourse?: number, visible?: 0 | 1 | 2 ) {
        this.unit = unit;
        this.visible = visible;
        this.idCourse = idCourse;
    }

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        

    @Column("int",{
        default: 0, 
        })
    idCourse:number;
        

    @IsNotEmpty()
    @Column("longtext")
    unit:string;
        

    @Column("int",{ 
        default: 0, 
        })
    order:number;
        

    @Validate(IntRangeValidator, [0, 3])
    @Column("tinyint",{ 
        default: UnitVisibility.auto, 
        })
    visible: number;

    // Reference to the parent group of this unit
    @ManyToOne((type)=> CourseModel, (course) => course._units, {onDelete: "CASCADE"})
    @JoinColumn({name: "idCourse"})
    _course: CourseModel;

     // Reference to the parent unit of this assignment
     @OneToMany((type)=> SectionModel, (section) => section._unit)
     _sections: SectionModel[];
        
}