import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MinLength, IsInt, Min, IsOptional, IsDate } from 'class-validator';
import { UserModel } from './UserModel';

@Entity("pw_news")
export class NewsModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
    
    @Column("int")
    idUserCreator: number;

    @MinLength(1)
    @Column("longtext",{ 
        nullable:true, 
        })
    html:string;
     
    @MinLength(1)
    @Column("longtext",{ 
        nullable:true, 
        })
    title:string;
     
    @IsOptional()
    @IsDate()
    @Column("datetime",{ 
        nullable:true, 
        })
    expires:Date;

    @IsInt()
    @Min(-1)
    @Column("int",{ 
        nullable:false,
        default: 0, 
        })
    order:number;
        
    @ManyToOne((type) => UserModel, (user) => user._newsCreated, {onDelete: "CASCADE"})
    @JoinColumn({name: "idUserCreator"})
    _user: UserModel;
}