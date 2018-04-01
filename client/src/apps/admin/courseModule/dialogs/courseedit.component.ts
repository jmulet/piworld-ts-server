import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core'; 
import { FormGroup, FormBuilder } from '@angular/forms'; 
import { pwCore } from '../../../shared/pw-core';
import { SchoolModel } from '../../../../entities/SchoolModel';
import { RestApi } from '../../../../rest/RestApi';


@Component({
    selector: 'app-course-edit',
    templateUrl: './courseedit.component.html',
    styleUrls: []
})
export class CourseEditComponent implements OnChanges {
    amiRoot: boolean;
    availableLangs: any[];
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<SchoolModel>();

    visible: boolean;

    constructor(private rest: RestApi) {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        const _formGroup: SimpleChange = changes.formGroup;
        if (_formGroup.currentValue) {
            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    onSubmit(course) {
        this.rest.ApiCourse.save(course).subscribe((data: any) => {
            if (data.id) {
                this.visible = false;
                this.onSave.emit(this.formGroup.value);
            }
        },
            (err) => {
                this.serverValidationErrors = err.message;
                console.log(err);
            })
    }

    close(){
        this.visible = false; 
    }
}