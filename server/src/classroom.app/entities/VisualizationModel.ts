import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { VisualizationQuizzModel } from './VisualizationQuizzModel';


@Entity("visualization")
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
    
    @OneToMany( (type)=> VisualizationQuizzModel, (visualizationQuizz) => visualizationQuizz.visualization)
    visualizationUsers: VisualizationQuizzModel[];
}