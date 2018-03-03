import { ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserModel } from "./UserModel";
import { IsInt, Validate } from "class-validator";
import { OffspringValidator } from "../validators/OffspringValidator";

@Entity("pw_offspring")
export class OffspringModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        
    @IsInt()
    @Column("int")
    idParent: number;

    @IsInt()
    @Column("int")
    // Validation idChild cannot be idParent
    @Validate(OffspringValidator)
    idChild: number;

    @ManyToOne((type) => UserModel, (user) => user._offspring)
    @JoinColumn({name: "idParent"})
    _parent: UserModel;

    @ManyToOne((type) => UserModel, (user) => user._childParents)
    @JoinColumn({name: "idChild"})
    _child: UserModel;
}