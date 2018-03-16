import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SectionModel } from './SectionModel';
import { UserModel } from '../UserModel';
 
@Entity("class_uploads")
export class UploadModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        
    @Column("int")
    idSection: number;
        
    @Column("int")
    idUser: number;

    @IsNotEmpty()
    @Column("longtext")
    file: string;
        
    @IsNotEmpty()
    @Column("longtext")
    message: string;
    
    @Column("datetime")
    uploadDate: Date;
        
    @Column("int", {
        default: 0
    })
    score: number;

    @Column("longtext")
    feedback: string;

    @ManyToOne((type) => SectionModel, (section) => section._uploads, {onDelete: "CASCADE"})
    @JoinColumn({name: "idSection"})
    _section: SectionModel;

    @ManyToOne((type) => UserModel, (users) => users._uploads, {onDelete: "CASCADE"})
    @JoinColumn({name: "idUser"})
    _user: number;
}