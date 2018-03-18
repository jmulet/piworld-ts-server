import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SchoolModel } from '../../../../libs/entities/SchoolModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminRestService } from '../../services/adminrest.service';
import { pwCore } from '../../pw-core';
import { UnitModel } from '../../../../libs/entities/UnitModel';


@Component({
    selector: 'app-unit-edit',
    template: require('./unitedit.component.html'),
    styleUrls: []
})
export class UnitEditComponent implements OnChanges {
    amiRoot: boolean; 
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<UnitModel>();

    visible: boolean;

    constructor(private arest: AdminRestService) {
        
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
        this.arest.saveUnit(unit).subscribe((data: any) => {
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