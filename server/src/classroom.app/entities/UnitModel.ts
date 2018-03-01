import { IsNotEmpty, Validate } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { GroupsModel } from '../../main.app/entities/GroupsModel';
import { IntRangeValidator } from '../../main.app/validators/IntRangeValidator';
import { AssignmentModel } from './AssignmentModel';

export enum UnitVisibility {
    hidden = 0,
    collapsed = 1,
    auto = 2,
    expanded = 3
}

@Entity("units")
export class UnitModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        

    @Column("int",{
        default: 0, 
        })
    idGroup:number;
        

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
    @ManyToOne((type)=> GroupsModel, (group) => group.units, {onDelete: "CASCADE", cascade: true})
    @JoinColumn({name: "idGroup"})
    group: GroupsModel;

     // Reference to the parent unit of this assignment
     @OneToMany((type)=> AssignmentModel, (assignment) => assignment.unit, {cascade: ["insert", "update"]})
     assignments: AssignmentModel[];
        
}