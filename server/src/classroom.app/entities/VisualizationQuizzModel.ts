import { IsDate, IsNotEmpty, Validate } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IntRangeValidator } from '../../main.app/validators/IntRangeValidator';
import { VisualizationModel } from './VisualizationModel';

@Entity("visualization_quizz")
export class VisualizationQuizzModel {
     
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idVisualization: number;
 
    @Column("longtext")
    answer: string;      

    @Column("longtext")
    rightAnwer: string;      

    @Validate(IntRangeValidator, [0, 1])
    @Column("tinyint")
    isValid: number;      

    @Column("tinyint", {
        default: 0
    })
    penalty: number;
     
    @ManyToOne( (type)=> VisualizationModel, (visualization) => visualization.visualizationUsers, {onDelete: "CASCADE"})
    @JoinColumn({name: "idVisualization"})
    visualization: VisualizationModel;
         
}