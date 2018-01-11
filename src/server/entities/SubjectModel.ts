import { GroupsModel } from './GroupsModel';
import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength, IsNotEmpty } from "class-validator";
import { ActivityModel } from './ActivityModel';


@Entity("subjects")
export class SubjectModel {

    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @IsNotEmpty()
    @MaxLength(11)
    @Column("varchar", {
        nullable: false,
        length: 11,
        default: "",
    })
    name: string;

    @IsNotEmpty()
    @MaxLength(255)
    @Column("varchar", {
        nullable: true,
        length: 255,
    })
    longname: string;

    // One subject has many associated groups
    @OneToMany((type) => GroupsModel, (group) => group.subject)
    groups: GroupsModel[];

    // One subject has many activities
    @OneToMany((type) => ActivityModel, (activity) => activity.subject)   
    activities: ActivityModel[];
}
