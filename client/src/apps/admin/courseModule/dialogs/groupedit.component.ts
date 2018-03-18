import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SchoolModel } from '../../../../libs/entities/SchoolModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminRestService } from '../../services/adminrest.service';
import { pwCore } from '../../pw-core';
import { UnitModel } from '../../../../libs/entities/UnitModel';
import { GroupsModel } from '../../../../libs/entities/GroupsModel';


@Component({
    selector: 'app-group-edit',
    template: require('./groupedit.component.html'),
    styleUrls: []
})
export class GroupEditComponent implements OnChanges {
    amiRoot: boolean; 
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<GroupsModel>();

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

    onSubmit(group: GroupsModel) {
        this.arest.saveGroup(group).subscribe((data: any) => {
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