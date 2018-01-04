import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GroupsModel } from './GroupsModel';
import { IsNumber, Validate } from 'class-validator';
import { RoleValidator } from '../validators/RoleValidator';
import { UserRoles } from './UserModel';

@Entity("enroll")
export class EnrollModel {

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
        default: UserRoles.student, 
        })
    idRole:number;

    @OneToOne(type => GroupsModel, group => group.id)
    @JoinColumn({name: "idGroup"})
    group: GroupsModel;    
}