import { IsInt } from 'class-validator';
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { RoleModel } from './RoleModel';
import { RoleCapabilitiesModel } from './RoleCapabilityModel';

@Entity("pw_roles_permissions") 
export class RolePermissionsModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id: number;

    @IsInt()
    @Column("int")
    idRole: number
    
    @IsInt()
    @Column("int")
    idCapability: number;

    @IsInt()
    @Column("tinyint")
    value: number;

    @ManyToOne( (type)=> RoleModel, (role) => role._permissions, {onDelete: "CASCADE"})   
    @JoinColumn({name: "idRole"})
    _role: RoleModel

    @ManyToOne( (type)=> RoleCapabilitiesModel, (capability) => capability._permissions, {onDelete: "CASCADE"})   
    @JoinColumn({name: "idCapability"})
    _capability: RoleCapabilitiesModel
 
}
