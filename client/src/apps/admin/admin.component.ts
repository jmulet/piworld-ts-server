import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
    selector: 'app-component',
    template: require('./admin.component.html'),
    styleUrls: [],
    providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AdminComponent implements OnInit {
    path: string;
    users: any[];
    view = 0;
    constructor(private router: Router, private location: Location) {        
    }
    ngOnInit() {       
       this.location.subscribe(val => {
           if(val.url==="centers") {
                this.router.navigate(['centers']);
           } else {
                this.router.navigate(['courses']);
           }
       });
    }
}