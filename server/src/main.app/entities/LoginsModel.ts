import { IsDate, IsInt, Max, Min, IsIP, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';

import { UserModel } from './UserModel';
import { VisualizationModel } from '../../classroom.app/entities';


@Entity("pw_logins")
export class LoginsModel {

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

    @ManyToOne(type => UserModel, (user)=> user._logins)
    @JoinColumn({ name: "idUser" })
    _user: UserModel;

    @OneToMany(type => VisualizationModel, (visualization)=> visualization._logins, {onDelete: "CASCADE", cascade: ["remove"]})
    _visualizations: VisualizationModel[];
    
    @BeforeInsert()
    setLoginDate() {
        this.login = new Date();
    }

    @BeforeUpdate()
    setLogoutDate() {
        this.logout = new Date();
    }
   
}