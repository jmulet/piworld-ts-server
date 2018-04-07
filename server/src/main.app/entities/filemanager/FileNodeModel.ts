import { IsInt, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilesClosureModel } from './FilesClosureModel';

@Entity("filemgr_files")
export class FileNodeModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
 
    @Column("longtext") 
    path: string;

    @Column("json") 
    metada: any;
 
    @OneToMany((type) => FilesClosureModel, (c) => c._ancestorNode )
    _ancestors: FilesClosureModel[];

    @OneToMany((type) => FilesClosureModel, (c) => c._descendantNode )    
    _descendants: FilesClosureModel[];
}