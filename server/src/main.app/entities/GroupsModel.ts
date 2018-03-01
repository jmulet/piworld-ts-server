import { EnrollModel } from './';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, BeforeInsert } from 'typeorm';
import { IsInt, Length, Validate, IsOptional, Min } from 'class-validator';
import { JsonStringValidator } from '../validators/JsonStringValidator';
import { UserModel, UserRoles } from './UserModel';
import { SubjectModel } from './SubjectModel';
import { UnitModel } from '../../classroom.app/entities/UnitModel';

export interface GroupsOptions {
    useInPda?: boolean;
    sendToParents?: boolean;
}
 
@Entity("groups")
export class GroupsModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("varchar", {
        nullable: false,
        length: 255,
    })
    name: string;

    @IsOptional()
    @Min(0)
    @Column("int", {
        nullable: true,
    })
    year: number;


    @Column("int", {
        nullable: false,
        default: "0",
    })
    idUserCreator: number;

    @IsOptional()
    @Column("json", {
        nullable: true,
    })
    gopts: GroupsOptions;

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
    @JoinColumn({ name: "idSubject" })
    subject: SubjectModel;

    //One group has many enroll entries
    @OneToMany(type => EnrollModel, enroll => enroll.group, { cascade: ["insert", "update"] })
    enrolls: EnrollModel[];

    //One group has many units 
    @OneToMany((type) => UnitModel, (unit) => unit.course, { cascade: ["insert", "update"] })
    units: UnitModel[];

    @BeforeInsert()
    insert() {
        this.gopts = this.gopts ||  {};       
    }
}