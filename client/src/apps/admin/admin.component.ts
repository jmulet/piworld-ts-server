import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import { Router, NavigationStart, RouterEvent } from '@angular/router';

@Component({
    selector: 'app-component',
    templateUrl: './admin.component.html',
    styleUrls: [],
    providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AdminComponent implements OnInit {
    currentModule: string; 
    path: string;
    users: any[];
    view = 0;
    constructor(private router: Router) {        
    }

    ngOnInit() {       
        this.router.events.subscribe( (event: RouterEvent) => {
            if (event instanceof NavigationStart) {
                this.currentModule = event.url || "/centers";
            }
        });
    }
}