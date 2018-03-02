import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, IsInt, Min, IsOptional, IsDate } from 'class-validator';

@Entity("pw_news")
export class NewsModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        
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
        
}