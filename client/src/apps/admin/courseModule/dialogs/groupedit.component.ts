import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SchoolModel } from '../../../../libs/entities/SchoolModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminRestService } from '../../services/adminrest.service';
import { pwCore } from '../../pw-core';
import { UnitModel } from '../../../../libs/entities/UnitModel';
import { GroupsModel } from '../../../../libs/entities/GroupsModel';
import { RestService } from '../../../shared/services/rest.service';
import { GroupsEnrollModel } from '../../../../libs/entities/GroupsEnrollModel';


@Component({
    selector: 'app-group-edit',
    template: require('./groupedit.component.html'),
    styleUrls: []
})
export class GroupEditComponent implements OnChanges {
    enrolledUsers: any[];
    allUsers: any[];
    amiRoot: boolean; 
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<GroupsModel>();

    visible: boolean;

    constructor(private rest: RestService, private arest: AdminRestService) {
        this.allUsers = [];
        this.enrolledUsers = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        const _formGroup: SimpleChange = changes.formGroup;
        const group = _formGroup.currentValue;
     
        if (group) {
            this.visible = true;
            const _enrolls = group["_enrolls"];
            this.rest.getUsers(pwCore.User.idSchool).subscribe( (data: any) => {
                this.allUsers = data;
                if (_enrolls) {
                    this.enrolledUsers = this.allUsers.filter((u) => {                    
                        return _enrolls.filter((e)=> e.idUser === u.id).length > 0;
                    });  
                }
            });
            
        } else {
            this.visible = false;
        }
    }

    onSubmit(group: GroupsModel) {
        group["_enrolls"] = this.enrolledUsers.map((u)=> {
            const e = new GroupsEnrollModel();
            e.idUser = u.id;
            e.idRole = u.idRole;
            e.idGroup = group.id;
            return e;
        });
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