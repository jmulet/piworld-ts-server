import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

import { SectionAssignModel } from './SectionAssignModel';
import { UnitModel } from './UnitModel'; 
import { ActivityModel } from './ActivityModel';
import { UploadModel } from '.';
  
 
@Entity("class_sections")
export class SectionModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;

    @Column("int")
    idUnit: number;

    @Column("int")
    idActivity: number;

    @Column("int")
    idUserCreator: number;

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
    @ManyToOne( (type)=> UnitModel, (unit) => unit._sections)
    @JoinColumn({name: "idUnit"})
    _unit: UnitModel;


    @ManyToOne( (type)=> ActivityModel, (activity) => activity._sections)
    @JoinColumn({name: "idActivity"})
    _activity: ActivityModel;

    @OneToMany((type) => UploadModel, (upload) => upload._section, {onDelete: "CASCADE", cascade: ["remove"]})
    _uploads: UploadModel[];
    
    // Reference to the list of user assignments
    @OneToMany( (type)=> SectionAssignModel, (sectionAssignment) => sectionAssignment._section, {onDelete: "CASCADE", cascade: ["remove"]})
    _sectionAssignments: SectionAssignModel[];
        
    @BeforeInsert()
    update(){
        this.postDate = new Date();
        this.params = this.params || {};
    }
}