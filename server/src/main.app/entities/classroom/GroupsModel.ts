
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, BeforeInsert } from 'typeorm';
import { IsInt, Length, Validate, IsOptional, Min } from 'class-validator';
import { JsonStringValidator } from '../../validators/JsonStringValidator';
import { UserModel, UserRoles } from '../UserModel';
import { SubjectModel } from '../SubjectModel';
import { UnitModel } from './UnitModel';
import { GroupsEnrollModel } from './GroupsEnrollModel';
import { SectionAssignModel } from './SectionAssignModel';
import { CourseModel } from './CourseModel';
import { PdaBadgesModel } from '../pda/PdaBadgesModel';

export interface GroupsOptions {
    useInPda?: boolean;
    sendToParents?: boolean;
}

@Entity("class_course_groups")
export class GroupsModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("varchar", {
        nullable: false,
        length: 255,
    })
    name: string;

    @Column("int", {
        nullable: false,
        default: "0",
    })
    idCourse: number;

    @IsOptional()
    @Column("json", {
        nullable: true,
    })
    gopts: GroupsOptions;

    @Column("longtext", {
        nullable: true,
    })
    thmcss: string;

    @Column("int")
    idUserCreator: number;

    // Many groups may be created by one user
    @ManyToOne((type) => UserModel, (user) => user._groupsCreated, {onDelete: "CASCADE"})
    @JoinColumn({ name: "idUserCreator" })
    _creator: UserModel;

    //One group has many sectionAssignments
    @ManyToOne((type) => CourseModel, (course) => course._courseGroups, {onDelete: "CASCADE"})
    @JoinColumn({ name: "idCourse" })
    _course: CourseModel;

    //One group has many enroll entries
    @OneToMany(type => GroupsEnrollModel, enroll => enroll._group, {cascade: ["insert", "update"]})
    _enrolls: GroupsEnrollModel[];

    //One group has many units 
    @OneToMany((type) => UnitModel, (unit) => unit._course)
    _units: UnitModel[];

    //One group has many sectionAssignments
    @OneToMany((type) => SectionAssignModel, (sectionAssign) => sectionAssign._group)
    _sectionAssignments: SectionAssignModel[];

    @OneToMany((type) => PdaBadgesModel, (badge) => badge._group)
    _pdaBadges: PdaBadgesModel[];

    @BeforeInsert()
    insert() {
        this.gopts = this.gopts || {};
    }
}