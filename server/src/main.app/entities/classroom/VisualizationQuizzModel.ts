import { IsDate, IsNotEmpty, Validate } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IntRangeValidator } from '../../validators/IntRangeValidator';
import { VisualizationModel } from './VisualizationModel';

@Entity("class_visualization_quizz")
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

    @ManyToOne((type) => VisualizationModel, (visualization) => visualization._visualizationUsers, {onDelete: "CASCADE"})
    @JoinColumn({ name: "idVisualization" })
    _visualization: VisualizationModel;

}