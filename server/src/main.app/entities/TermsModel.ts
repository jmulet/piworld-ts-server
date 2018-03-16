import { ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserModel } from "./UserModel";
import { SchoolModel } from "./SchoolModel";
import { IsInt, Validate, IsDate } from "class-validator";
import { OffspringValidator } from "../validators/OffspringValidator";
import { HolidayValidator } from "../validators/HolidayValidator";

@Entity("pw_terms")
export class TermsModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        
    @IsInt()
    @Column("int")
    idSchool: number;
    
    @Column("int")
    year: number;
    
    @Column("tinyint")
    term: 1 | 2 | 3 | 4;

    @IsDate()
    @Column("date")
    fromDate: number;

    @IsDate()
    @Column("date")
    // Validation toDate must be larger or equal to fromDate
    @Validate(HolidayValidator)
    toDate: number;

    @ManyToOne((type) => SchoolModel, (school) => school._terms, {onDelete: "CASCADE"})
    @JoinColumn({name: "idSchool"})
    _school: SchoolModel;

    
}