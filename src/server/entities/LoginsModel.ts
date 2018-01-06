import { IsDate, IsInt, Max, Min, IsIP, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

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

    @IsInt()
    @Min(0)
    @Max(1)
    @Column("tinyint", {
        nullable: false,
        default: 0,
    })
    parents: number;


    @IsOptional()
    @IsIP()
    @Column("varchar", {
        nullable: true,
        length: 255,
    })
    ip: string;


    @IsOptional()
    @IsDate()
    @Column("datetime", {
        nullable: true,
    })
    login: Date;

    @IsOptional()
    @IsDate()
    @Column("datetime", {
        nullable: true,
    })
    logout: Date;

    @ManyToOne(type => UserModel, (user)=> user.id)
    @JoinColumn({ name: "idUser" })
    user: UserModel;

    
    @BeforeInsert()
    setLoginDate() {
        this.login = new Date();
    }

    @BeforeUpdate()
    setLogoutDate() {
        this.logout = new Date();
    }
   
}