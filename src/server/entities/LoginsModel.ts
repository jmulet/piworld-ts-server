import { IsDate } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserModel } from './UserModel';


@Entity("logins")
export class LoginsModel {

    static fromData(idUser = 0, ip = "", login = new Date(), parents: 0 | 1 = 0): LoginsModel  {
        const logInstance = new LoginsModel();
        logInstance.idUser = idUser;
        logInstance.ip = ip;
        logInstance.login = login;
        logInstance.parents = parents;
        return logInstance;
    }

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;


    @Column("int", {
        nullable: true,
    })
    idUser: number;


    @Column("tinyint", {
        nullable: false,
        default: "0",
    })
    parents: number;


    @Column("varchar", {
        nullable: true,
        length: 255,
    })
    ip: string;


    @Column("datetime", {
        nullable: true,
    })
    @IsDate()
    login: Date;


    @Column("datetime", {
        nullable: true,
    })
    @IsDate()
    logout: Date;

    @ManyToOne(type => UserModel, (user)=> user.id)
    @JoinColumn({ name: "idUser" })
    user: UserModel;
    
}