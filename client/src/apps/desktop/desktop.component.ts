import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
@Component({
    selector: 'app-component',
    template: require('./desktop.component.html'),
    styleUrls: []
})
export class DesktopComponent implements OnInit {
    users: any[];
    constructor(private rest: RestService) {
    }
    ngOnInit() {
       this.rest.getUsers().subscribe( (data: any[])=> this.users = data);
    }
}