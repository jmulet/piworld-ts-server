import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from '../../main.app/entities/UserModel';
import { PdaActivityModel } from './PdaActivityModel';

@Entity("pda_activity_grades")
export class PdaActivityGrades {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;
    
    @Column("int")
    idActivity: number;

    @Column("int")
    idUser: number;
    
    @Column("float", {
        default: -10
    })
    grade: number;

    @ManyToOne( (type) => PdaActivityModel, (activity) => activity._pdaGrades)
    @JoinColumn({name: "idActivity"})
    _activity: UserModel;

    @ManyToOne( (type) => UserModel, (user) => user._pdaGrades)
    @JoinColumn({name: "idUser"})
    _user: UserModel;


}
