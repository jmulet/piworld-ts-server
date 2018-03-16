import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GroupsModel } from '../classroom/GroupsModel';
import { UserModel } from '../UserModel';


  
@Entity("pda_badges")
export class PdaBadgesModel {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;
    
    @Column("int")
    idUser: number;

    @Column("int")
    idCreator: number;

    @Column("int")
    idGroup: number;

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

    @Column("longtext")
    description: string;

    @ManyToOne( (type) => UserModel, (user) => user._badgesOwned, {onDelete: "CASCADE"})
    @JoinColumn({name: "idUser"})
    _user: UserModel;

    @ManyToOne( (type) => UserModel, (creator) => creator._badgesCreated, {onDelete: "CASCADE"})
    @JoinColumn({name: "idCreator"})
    _creator: UserModel;

    @ManyToOne( (type) => GroupsModel, (group) => group._pdaBadges, {onDelete: "CASCADE"})
    @JoinColumn({name: "idGroup"})
    _group: GroupsModel;

}
