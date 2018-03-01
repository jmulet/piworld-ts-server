import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

import { AssignmentUsersModel } from './AssignmentUsersModel';
import { UnitModel } from './UnitModel';

  
 
@Entity("assignments")
export class AssignmentModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;

    @Column("int")
    idUser: number;

    @Column("int")
    idUnit: number;

    @Column("datetime")
    postDate: Date;

    @Column("int", {
        default: 0
    })
    order: number;

    @Column("datetime",{
        nullable: true
    })
    fromDate: Date;

    @Column("datetime", {
        nullable: true
    })
    toDate: Date;

    @Column("tinyint", {
        default: 0  //=0 undefined
    })
    maxAttempts: number;

    @Column("longtext")
    instructions: string;
     
    @Column("tinyint", {
        default: 0  //=0 false
    })
    applyToAll: number;

    @Column("json")
    params: any;

    @Column("tinyint", {
        default: 1  //=1 visible
    })
    visible: number;

    // Reference to the parent unit of this assignment
    @ManyToOne( (type)=> UnitModel, (unit) => unit.assignments, {onDelete: "CASCADE", cascade: true})
    @JoinColumn({name: "idUnit"})
    unit: UnitModel;

     // Reference to the list of user assignments
     @OneToMany( (type)=> AssignmentUsersModel, (assignmentUsers) => assignmentUsers.assignment)
     assignmentUsers: AssignmentUsersModel[];
        
     @BeforeInsert()
     update(){
        this.postDate = new Date();
        this.params = this.params || {};
     }
}