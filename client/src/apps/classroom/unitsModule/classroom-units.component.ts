import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { UnitModel } from '../../../entities/UnitModel';
import { CourseModel } from '../../../entities/CourseModel';
import { RestApi } from '../../../rest/RestApi';
import { pwCore } from '../../admin/pw-core';

@Component({
    selector: 'app-classroom-units',
    template: require('./classroom-units.component.html'),
    styleUrls: []
})
export class ClassroomUnitsComponent implements OnInit {
    units: UnitModel[];
    courses: SelectItem[];
    courseSelected: CourseModel;

    constructor(private rest: RestApi) {
    }
    ngOnInit() {
       this.rest.ApiCourse.list(pwCore.User.id).subscribe( (data: any[])=> {
           this.courses = data.map( (c) => { return {label: c.name, value: c} });
           if (data.length) {
                this.courseSelected = data[0];
                this.onCourseChanged(null);
           }
           console.log(this.courses);
       });
    }

    onCourseChanged(evt) {
        if (evt) {
            this.courseSelected = evt.value;
        }
        if (!this.courseSelected) {
            return;
        }
        this.rest.ApiUnits.listCreated(this.courseSelected.id).subscribe( (data: any[]) => {
            console.log(data);
            this.units = data;
        });
    }
}