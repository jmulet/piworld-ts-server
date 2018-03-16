import { Validate } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoleValidator } from '../../validators/RoleValidator';
import { GroupsModel } from './GroupsModel';

@Entity("class_course_groups_enroll")
export class GroupsEnrollModel {


    @PrimaryGeneratedColumn("increment", {type: "int"})
    id: number;

    @Column("int",{ 
        nullable:true, 
        })
    idGroup: number;

    @Column("int",{ 
        nullable:true, 
        })
    idUser:number;
        
    @Validate(RoleValidator)
    @Column("int",{ 
        nullable:false,
        default: 200, 
        })
    idRole:number;

    //Many enroll entries belong to a single group
    @ManyToOne(type => GroupsModel, group => group._enrolls, {onDelete: "CASCADE"})
    @JoinColumn({name: "idGroup"})
    _group: GroupsModel;    
}