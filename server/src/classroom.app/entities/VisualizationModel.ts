import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { VisualizationQuizzModel } from './VisualizationQuizzModel';
import { LoginsModel } from '../../main.app/entities';


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

    //Many visualization can be of one login
    @ManyToOne( (type)=> LoginsModel)
    @JoinColumn({name: "idLogins"})
    login: LoginsModel;
}