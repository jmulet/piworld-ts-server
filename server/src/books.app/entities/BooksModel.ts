import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BooksAssignModel } from './BooksAssignModel';
 

@Entity("books_book")
export class BooksModel {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;

    @Column("longtext")
    bookCode: string;

    @Column("longtext")
    title: string;
    
    @Column("varchar")
    author: string;

    @Column("longtext")
    url: string;
    
    @Column("int")
    year: number;

    @Column("varchar")
    level: string;

    @Column("varchar")
    genre: string;

    @Column("longtext")
    img: string;

    @Column("tinyint")
    key: number;

    @Column("tinyint")
    allStudents: number;

    @Column("tinyint")
    allTeachers: number;

    @OneToMany((type)=>BooksAssignModel, (bookAsgn)=>bookAsgn._book, {onDelete: "CASCADE", cascade: ["remove"]})
    _bookAssignments: BooksAssignModel[];

}