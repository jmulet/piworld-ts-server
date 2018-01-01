import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";


@Entity()
export class forums_themes_entries {


    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true, 
        })
    id:number;
        

    @Column("int",{ 
        nullable:false, 
        })
    idForumTheme:number;
        

    @Column("longtext",{ 
        nullable:false, 
        })
    entry:string;
        

    @Column("int",{ 
        nullable:false, 
        })
    createdBy:number;
        

    @Column("timestamp",{ 
        nullable:false,
        default:"CURRENT_TIMESTAMP", 
        })
    createdWhen:Date;
        

    @Column("int",{ 
        nullable:false,
        default:"0", 
        })
    answerTo:number;
        
}