import { IsInt, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FileNodeModel } from './FileNodeModel';

/**
 * This is how clousure table works. Assume this file structure
 * that is stored into FileNodes table
 * ID FULLPATH                 RELATIVEPATH
 * 1  /                         
 * 2  /Users                    Users
 * 3  /Courses                  Courses
 * 4  /Users/root               root
 * 5  /Users/root/readme.txt    readme.txt
 * 6  /perico.txt               perico.txt
 * etc...
 * 
 * Then we use this clousure table to the tell each node which is its parent dir
 * ID ABOVEID PARENTID
 * 1    1   null            <--- The root is the only node that has no parent (null)
 * 2    2    1
 * 3    3    1
 * 4    4    2
 * 5    5    4
 * 6    6    1
 */

@Entity("filemgr_files_closure")
export class FilesClosureModel {

    @PrimaryColumn("int")
    idAncestor: number;

    @PrimaryColumn("int")
    idDescendant: number;

    @ManyToOne((type) => FileNodeModel, (file) => file._ancestors )
    @JoinColumn({name: "idParent"})
    _ancestorNode: FileNodeModel;

    @ManyToOne((type) => FileNodeModel, (file) => file._descendants )
    @JoinColumn({name: "idDescendant"})
    _descendantNode: FileNodeModel;
}