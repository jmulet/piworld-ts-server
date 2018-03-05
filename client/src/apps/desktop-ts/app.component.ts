import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-component',
    template: '<h1>{{msg}}</h1>',
    styleUrls: []
})
export class AppComponent implements OnInit {
    msg: string;
    constructor() {
    }
    ngOnInit() {
        this.msg = "Hello world from mainapp!";
    }
}