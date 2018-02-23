import { EnrollModel } from './';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsInt, Length, Validate, IsOptional, Min } from 'class-validator';
import { JsonStringValidator } from '../validators/JsonStringValidator';
import { UserModel } from './UserModel';
import { SubjectModel } from './SubjectModel';
import { UnitModel } from './UnitModel';


@Entity("groups")
export class GroupsModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("varchar", {
        nullable: false,
        length: 255,
    })
    groupName: string;

    @IsInt()
    @Column("int", {
        nullable: false,
        default: 1,
    })
    groupLevel: number;

    @Length(1, 5)
    @Column("varchar", {
        nullable: false,
        length: 5,
        default: "BAT",
    })
    groupStudies: string;

    @Length(1, 255)
    @Column("varchar", {
        nullable: false,
        length: 255,
        default: "A",
    })
    groupLetter: string;

    @IsOptional()
    @Min(0)
    @Column("int", {
        nullable: true,
    })
    groupYear: number;


    @Column("int", {
        nullable: false,
        default: "0",
    })
    idUserCreator: number;


    @Column("varchar", {
        nullable: false,
        length: 255,
    })
    enrollPassword: string;


    @Column("int", {
        nullable: false,
        default: "1",
    })
    idSubject: number;


    @Column("int", {
        nullable: false,
        default: "0",
    })
    currentUnit: number;

    @IsOptional()
    @Column("json", {
        nullable: true,
    })
    gopts: any;

    @Column("longtext", {
        nullable: true,
    })
    thmcss: string;

    // Many groups may be created by one user
    @ManyToOne((type) => UserModel, (user) => user.groupsCreated, { onDelete: "CASCADE" })
    @JoinColumn({ name: "idUserCreator" })
    creator: UserModel;

    // Many groups have associated one subject
    @ManyToOne((type) => SubjectModel, (subject) => subject.groups, { onDelete: "CASCADE" })
    subject: SubjectModel;

    //One group has many enroll entries
    @OneToMany(type => EnrollModel, enroll => enroll.group)
    enrolls: EnrollModel[];

    //One group has many units 
    @OneToMany((type) => UnitModel, (unit) => unit.group)
    units: UnitModel[];
}