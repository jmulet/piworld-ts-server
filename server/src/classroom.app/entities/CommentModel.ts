import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("comments")
export class CommentModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idUser: number;

    @Column("int")
    idActivity: number;

    @IsDate()
    @Column("datetime")
    day: Date;      

    @IsNotEmpty()
    @Column("longtext")
    comment: string;
}