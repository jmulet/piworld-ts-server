import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AssignmentModel } from './AssignmentModel';

  
 
@Entity("assignments_users")
export class AssignmentUsersModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;

    @Column("int")
    idAssignment: number;

    @Column("int")
    idUser: number;
 
    // Reference to the parent assignment
    @ManyToOne( (type)=> AssignmentModel, (assignment) => assignment.assignmentUsers, {onDelete: "CASCADE", cascadeAll: true})
    @JoinColumn({name: "idAssignment"})
    assignment: AssignmentModel;
        
}