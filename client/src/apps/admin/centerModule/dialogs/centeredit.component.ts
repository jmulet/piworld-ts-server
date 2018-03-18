import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SchoolModel } from '../../../../libs/entities/SchoolModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminRestService } from '../../services/adminrest.service';
import { pwCore } from '../../pw-core';


@Component({
    selector: 'app-center-edit',
    template: require('./centeredit.component.html'),
    styleUrls: []
})
export class CenterEditComponent implements OnChanges {
    amiRoot: boolean;
    availableLangs: any[];
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<SchoolModel>();

    visible: boolean;

    constructor(private arest: AdminRestService) {
        this.availableLangs = [];
        pwCore.SupportedLangs.forEach(element => {
            this.availableLangs.push({ label: element, value: element });
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const _formGroup: SimpleChange = changes.formGroup;
        if (_formGroup.currentValue) {
            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    onSubmit(center) {
        this.arest.saveSchool(center).subscribe((data: any) => {
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
        this.formGroup = null;
    }
}