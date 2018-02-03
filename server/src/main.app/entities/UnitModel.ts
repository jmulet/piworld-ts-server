import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, Validate } from 'class-validator';
import { IntRangeValidator } from '../validators/IntRangeValidator';
import { GroupsModel } from './GroupsModel';

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
        nullable:false,
        default: 0, 
        })
    idGroup:number;
        

    @IsNotEmpty()
    @Column("longtext",{ 
        nullable:false, 
        })
    unit:string;
        

    @Column("int",{ 
        nullable:false,
        default: 0, 
        })
    order:number;
        

    @Validate(IntRangeValidator, [0, 3])
    @Column("tinyint",{ 
        nullable:false,
        default: UnitVisibility.auto, 
        })
    visible: number;

    // Reference to the parent group of this unit
    @ManyToOne( (type)=> GroupsModel, (group) => group.units, {onDelete: "CASCADE"})
    @JoinColumn({name: "idGroup"})
    group: GroupsModel;
        
}