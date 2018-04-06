import { MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserModel } from './UserModel';

@Entity("pw_famous_eqn")
export class FamousEqnModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
    
    @Column("int")
    idUserCreator: number;

    @MaxLength(255)
    @Column("varchar")
    title: string;
    
    @Column("longtext")
    eqn: string;

    @Column("longtext", {
        nullable: true
    })
    url: string;

    @ManyToOne((type) => UserModel, (user) => user._equationsCreated, {onDelete: "CASCADE"})
    @JoinColumn({name: "idUserCreator"})
    _user: UserModel;
}