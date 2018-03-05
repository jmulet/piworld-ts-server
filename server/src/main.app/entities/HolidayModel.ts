import { ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserModel } from "./UserModel";
import { SchoolModel } from "./SchoolModel";
import { IsInt, Validate, IsDate } from "class-validator";
import { OffspringValidator } from "../validators/OffspringValidator";
import { HolidayValidator } from "../validators/HolidayValidator";

@Entity("pw_holidays")
export class HolidayModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        
    @IsInt()
    @Column("int")
    idSchool: number;

    @IsInt()
    @Column("int",{
        default: 2017
    })
    year: number;

    @IsDate()
    @Column("datetime")
    fromDate: Date;

    @IsDate()
    @Column("datetime")
    // Validation toDate must be larger or equal to fromDate
    @Validate(HolidayValidator)
    toDate: Date;

    @Column("longtext")
    description: string;

    @ManyToOne((type) => SchoolModel, (school) => school._holidays)
    @JoinColumn({name: "idSchool"})
    _school: SchoolModel;

    
}