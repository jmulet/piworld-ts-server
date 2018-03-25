import { Component, OnInit } from '@angular/core';

import { RestApi } from '../../../rest/RestApi';

@Component({
    selector: 'app-classroom-assign',
    template: require('./classroom-assign.component.html'),
    styleUrls: []
})
export class ClassroomAssignComponent implements OnInit {
     
    constructor(private rest: RestApi) {
    }
    ngOnInit() {
      
    }
}