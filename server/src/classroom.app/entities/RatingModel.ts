import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("ratings")
export class RatingModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idActivity: number;

    @Column("int")
    idUser: number;

    @Column("tinyint", {
        default: 3
    })
    rate: number;      

    @Column("tinyint", {
        default: 3
    })
    vrate: number;
}