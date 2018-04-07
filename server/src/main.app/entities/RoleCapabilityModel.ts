import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IsNotEmpty, MaxLength, IsInt } from "class-validator";
import { RolePermissionsModel } from "./RolePermissionsModel";

@Entity("pw_roles_capabilities") 
export class RoleCapabilitiesModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id: number;

    @MaxLength(255)
    @Column("varchar")
    appName: string;
    
    @Column("varchar")
    name: string;

    @IsInt()
    @Column("tinyint")
    defaults: number;

    @Column("longtext")
    description: string;
 
    // Only ancestors of this role can edit this capability
    @Column("tinyint")
    idRoleParentEditable: number;
    
    @OneToMany( (type)=> RolePermissionsModel, (permission) => permission._capability, {cascade: ["insert", "update"]})   
    _permissions: RolePermissionsModel[];
     
}
