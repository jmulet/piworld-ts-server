import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { VisualizationQuizzModel } from './VisualizationQuizzModel';
import { LoginsModel } from '../LoginsModel';


@Entity("class_visualization")
export class VisualizationModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idActivity: number;

    @Column("int")
    idAssignment: number;

    @Column("int")
    idLogins: number;

    @Column("longtext")
    resource: string;      

    @Column("int", {
        default: 0
    })
    vscore: number;

    @Column("int", {
        default: 0
    })
    vseconds: number;
   
    //Many visualization can be of one login
    @ManyToOne( (type)=> LoginsModel, (logins)=>logins._visualizations, {onDelete: "CASCADE"})
    @JoinColumn({name: "idLogins"})
    _logins: LoginsModel;

     
    @OneToMany( (type)=> VisualizationQuizzModel, (visualizationQuizz) => visualizationQuizz._visualization)
    _visualizationUsers: VisualizationQuizzModel[];

}