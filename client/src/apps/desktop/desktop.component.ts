import { Component, OnInit } from '@angular/core'; 
import { RestApi } from '../../rest/RestApi';
@Component({
    selector: 'app-component',
    template: require('./desktop.component.html'),
    styleUrls: []
})
export class DesktopComponent implements OnInit {
    users: any[];
    constructor(private rest: RestApi) {
    }
    ngOnInit() {
       this.rest.ApiUsers.list().subscribe( (data: any[])=> this.users = data);
    }
}