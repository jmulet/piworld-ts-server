import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("news")
export class NewsModel {

    @PrimaryGeneratedColumn("increment", {type: "int"})
    id:number;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    html:string;
        

    @Column("longtext",{ 
        nullable:true, 
        })
    title:string;
        

    @Column("datetime",{ 
        nullable:true, 
        })
    expires:Date;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    order:number;
        
}