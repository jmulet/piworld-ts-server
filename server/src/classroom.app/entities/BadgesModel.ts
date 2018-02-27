import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity("badges")
export class BadgesModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idUser: number;

    @Column("tinyint", {
        nullable: true
    })
    type: number;

    @IsNotEmpty()
    @IsDate()
    @Column("date", {
        nullable: false,
    })
    day: Date;

    @Column("int", {
        nullable: false,
        default: 0
    })
    rscore: number;

    @Column("int")
    idCreator: number;

    @Column("int")
    idGroup: number;
}