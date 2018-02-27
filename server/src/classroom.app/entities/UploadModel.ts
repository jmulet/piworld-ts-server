import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity("uploads")
export class UploadModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        
    @Column("int")
    idAssignment: number;
        
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
}