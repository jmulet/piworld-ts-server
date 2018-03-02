import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { SectionModel } from './SectionModel';
import { GroupsModel } from './GroupsModel';
import { AttemptModel } from './AttemptModel';

  
 
@Entity("class_sections_assign")
export class SectionAssignModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;

    @Column("int")
    idSection: number;

    @Column("int")
    idGroup: number;
 
    // Reference to the parent section
    @ManyToOne( (type)=> SectionModel, (section) => section._sectionAssignments)
    @JoinColumn({name: "idSection"})
    _section: SectionModel;
        
    // Reference to the course group
    @ManyToOne( (type)=> GroupsModel, (group) => group._sectionAssignments)
    @JoinColumn({name: "idGroup"})
    _group: GroupsModel;

    @OneToMany((type)=>(AttemptModel), (attempt)=>attempt._sectionAssign)
    @JoinColumn({name: "idSectionAssign"})
    _attempts: AttemptModel[];
}


