import { Component, OnInit } from '@angular/core';

import { RestApi } from '../../../rest/RestApi';

@Component({
    selector: 'app-classroom-search',
    template: require('./classroom-search.component.html'),
    styleUrls: []
})
export class ClassroomSearchComponent implements OnInit {
     
    constructor(private rest: RestApi) {
    }
    ngOnInit() {
      
    }
}