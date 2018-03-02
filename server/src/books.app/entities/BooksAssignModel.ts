import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BooksModel } from './BooksModel';
import { CourseModel } from '../../classroom.app/entities';

 

@Entity("books_book_assignments")
export class BooksAssignModel {
    @PrimaryGeneratedColumn("increment", { type: "int" })
    id: number;
    
    @Column("int")
    idBook: number;

    @Column("int")
    idCourse: number;

    @Column("datetime")
    expires: Date;

    @ManyToOne((type)=>BooksModel, (book)=>book._bookAssignments)
    @JoinColumn({name: "idBook"})
    _book: BooksModel;

    @ManyToOne((type)=>CourseModel, (course)=>course._bookAssignments)
    @JoinColumn({name: "idCourse"})
    _course: CourseModel;
}