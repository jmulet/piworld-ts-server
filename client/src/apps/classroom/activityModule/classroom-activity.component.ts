import { Component, OnInit } from '@angular/core';

import { RestApi } from '../../../rest/RestApi';

@Component({
    selector: 'app-classroom-activity',
    templateUrl: './classroom-activity.component.html',
    styleUrls: []
})
export class ClassroomActivityComponent implements OnInit {
     
    constructor(private rest: RestApi) {
    }
    ngOnInit() {
      
    }
}