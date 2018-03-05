import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'second-component',
    template: '<button class="btn btn-sm btn-warning" (click)="onClick()"><span class="fa fa-cogs"></span></button>',
    styleUrls: []
})
export class SecondComponent implements OnInit {
    msg: string;
    constructor(private http: HttpClient) {
    }
    ngOnInit() {
        this.msg = "Hello world from second component!";
    }
    onClick() {
         this.http.get("@/api/school/list").subscribe( data => {
            console.log(data);
         });
         //, {observe: 'response'}
         this.http.get("@/api/school/holiday/list?idSchool=1").subscribe( data => {
            console.log(data);
        });
        this.http.post("*/login.htm", {username: 'root', password: 'manolo'}).subscribe( data => {
            console.log(data);
        });
        this.http.post("@/api/user/", {username: 'prova'}).subscribe( data => {
            console.log(data);
        }, (error) => {
            console.log("The error should appear", error);
        });
    } 
}