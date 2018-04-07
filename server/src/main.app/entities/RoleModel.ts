import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IsNotEmpty, MaxLength, IsInt, IsIn } from "class-validator";
import { RolePermissionsModel } from "./RolePermissionsModel";
import { RoleCapabilitiesModel } from "./RoleCapabilityModel";

/**
 * By default a number of roles are defined
 * each being a descendant of the latter
 * NAME              PARENT
 * admin             null
 * teacheradmin      admin
 * teacher           teacheradmin
 * teachernonediting teacher
 * student           teachernonediting
 * parents           teachernonediting
 * guest             student
 * 
 * 
 * You can create any other role by specifying the desired PARENT
 * specialStudent     teacher
 * specialTeacher     teacheradmin
 * ...
 * 
 * Depending on the parent, some capabilities will be read only.
 * 
 */

@Entity("pw_roles") 
export class RoleModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id: number;

    @MaxLength(255)
    @Column("varchar")
    name: string;

    // Make roles hierarchy to allow editing roles capabilities
    @IsInt()
    @Column("int", {
        nullable: true
    }) 
    idRoleParent: number; 

    @IsInt()
    @Column("int", {
        default: 1
    })
    idUserCreator: number;
    
    // Users - Courses
    @MaxLength(255)
    @IsIn(['Users', 'Courses'])
    @Column("varchar")
    scope: string;

    @Column("longtext")
    description: string;

    @OneToMany( (type)=> RolePermissionsModel, (permission) => permission._role, {cascade: ["insert", "update"]})   
    _permissions: RolePermissionsModel[];

}
