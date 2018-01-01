import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GroupsModel } from './GroupsModel';

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
        
    @Column("int",{ 
        nullable:false,
        default:"200", 
        })
    idRole:number;

    @OneToOne(type => GroupsModel, group => group.id)
    @JoinColumn({name: "idGroup"})
    group: GroupsModel;    
}