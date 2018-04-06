import { MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserModel } from './UserModel';

@Entity("pw_famous_quote")
export class FamousQuoteModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
    
    @Column("int")
    idUserCreator: number;

    @Column("longtext")
    quote: string;

    @MaxLength(255)
    @Column("varchar")
    author: string;
    
    @Column("longtext", {
        nullable: true
    })
    url: string;

    @ManyToOne((type) => UserModel, (user) => user._quotesCreated, {onDelete: "CASCADE"})
    @JoinColumn({name: "idUserCreator"})
    _user: UserModel;
}