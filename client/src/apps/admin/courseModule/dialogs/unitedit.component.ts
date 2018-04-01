import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
 
import { FormGroup, FormBuilder } from '@angular/forms'; 
import { pwCore } from '../../../shared/pw-core'; 
import { UnitModel } from '../../../../entities/UnitModel';
import { RestApi } from '../../../../rest/RestApi';


@Component({
    selector: 'app-unit-edit',
    templateUrl: './unitedit.component.html',
    styleUrls: []
})
export class UnitEditComponent implements OnChanges {
    amiRoot: boolean; 
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<UnitModel>();

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

    onSubmit(unit: UnitModel) {
        this.rest.ApiUnits.save(unit).subscribe((data: any) => {
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