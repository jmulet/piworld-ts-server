import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FamousEqnModel } from '../../../../entities/FamousEqnModel';
import { RestApi } from '../../../../rest/RestApi';


@Component({
    selector: 'app-equation-edit',
    templateUrl: './equationedit.component.html',
    styleUrls: []
})
export class EquationEditComponent implements OnChanges {
     
    locale: any;
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<FamousEqnModel>();

    visible: boolean;

    constructor(private rest: RestApi){}

    ngOnChanges(changes: SimpleChanges): void {
        const _formGroup: SimpleChange = changes.formGroup;
        if (_formGroup.currentValue) {
            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    onSubmit(entity: FamousEqnModel) {
        this.rest.ApiFamous.saveEquation(entity).subscribe((data: any) => {           
            if (data.id) {               
                this.onSave.emit(this.formGroup.value);
            }
            this.visible = false;
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