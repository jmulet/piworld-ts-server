
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, BeforeInsert } from 'typeorm';
import { IsInt, Length, Validate, IsOptional, Min } from 'class-validator';
import { JsonStringValidator } from '../../main.app/validators/JsonStringValidator';
import { UserModel, UserRoles } from '../../main.app/entities/UserModel';
import { SubjectModel } from '../../main.app/entities/SubjectModel';
import { UnitModel } from './UnitModel';
import { GroupsEnrollModel } from './GroupsEnrollModel';
import { SectionAssignModel } from './SectionAssignModel';
import { CourseModel } from './CourseModel';
import { PdaBadgesModel } from '../../pda.app/entities';

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

    // Many groups may be created by one user
    @ManyToOne((type) => UserModel, (user) => user._groupsCreated)
    @JoinColumn({ name: "idUserCreator" })
    _creator: UserModel;

    //One group has many sectionAssignments
    @ManyToOne((type) => CourseModel, (course) => course._courseGroups)
    @JoinColumn({ name: "idCourse" })
    _course: CourseModel;

    //One group has many enroll entries
    @OneToMany(type => GroupsEnrollModel, enroll => enroll._group, { onDelete: "CASCADE", cascade: ["remove"] })
    _enrolls: GroupsEnrollModel[];

    //One group has many units 
    @OneToMany((type) => UnitModel, (unit) => unit._course, { onDelete: "CASCADE", cascade: ["remove"] })
    _units: UnitModel[];

    //One group has many sectionAssignments
    @OneToMany((type) => SectionAssignModel, (sectionAssign) => sectionAssign._group, { onDelete: "CASCADE", cascade: ["remove"] })
    _sectionAssignments: SectionAssignModel[];

    @OneToMany((type) => PdaBadgesModel, (badge) => badge._group, { onDelete: "CASCADE", cascade: ["remove"] })
    _pdaBadges: PdaBadgesModel[];

    @BeforeInsert()
    insert() {
        this.gopts = this.gopts || {};
    }
}