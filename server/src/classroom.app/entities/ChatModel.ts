import { IsDate, IsNotEmpty, Validate } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IntRangeValidator } from '../../main.app/validators/IntRangeValidator';

@Entity("chat")
export class ChatModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("int")
    idGroup: number;

    @Column("int")
    idUser: number;
 
    @IsDate()
    @Column("datetime")
    day: Date;      

    @IsNotEmpty()
    @Column("longtext")
    msg: string;
   
    //This is idRecipient, 0 if goes to the entire idGroup.
    @Column("int")
    isFor: number;

    @Validate(IntRangeValidator, [0,1])
    @Column("tinyint")
    parents: number;
}