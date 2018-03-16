import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserModel } from '../UserModel';
import { GroupsModel } from '../classroom/GroupsModel';
import { PdaActivityGrades } from './PdaActivityGrades';
 

@Entity("pda_activities")
export class PdaActivityModel {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;
    
    @Column("int")
    idCreator: number; 

    @Column("int")
    idGroup: number; 

    @Column("tinyint", {
        default: 1
    })
    trimestre: 1 | 2 | 3 | 4; 
    
    @Column("date")
    day: Date; 

    @Column("float")
    weight: number; 
        
    @Column("longtext")
    category: string; 

    @Column("longtext")
    formula: string; 

    @Column("tinyint", {
        default: 1
    })
    visible: 0 | 1; 

    @ManyToOne( (type) => UserModel, (user) => user._pdaBadges, {onDelete: "CASCADE"})
    @JoinColumn({name: "idCreator"})
    _user: UserModel;

    @ManyToOne( (type) => GroupsModel, (group) => group._pdaBadges, {onDelete: "CASCADE"})
    @JoinColumn({name: "idGroup"})
    _group: GroupsModel;

    @OneToMany( (type)=> PdaActivityGrades, (grade)=>grade._activity)
    _pdaGrades: PdaActivityGrades[];
}