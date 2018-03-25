import { Component, OnInit } from '@angular/core'; 
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { pwCore } from '../admin/pw-core'; 
import { SelectItem } from 'primeng/api';
import { UnitModel } from '../../entities/UnitModel';
import { CourseModel } from '../../entities/CourseModel';
import { RestApi } from '../../rest/RestApi';
import { Router } from '@angular/router';

@Component({
    selector: 'app-component',
    template: require('./classroom.component.html'),
    styleUrls: [],
    providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class ClassroomComponent implements OnInit {
    path: string;
    users: any[];
    view = 0;
    constructor(private router: Router, private location: Location) {        
    }
    ngOnInit() {       
       this.location.subscribe(val => {
           if( ["units", "search", "activity", "assign"].indexOf(val.url) >=0 ) {
                this.router.navigate([val.url]);
           } else {
                this.router.navigate(['units']);
           }
       });
    }
}