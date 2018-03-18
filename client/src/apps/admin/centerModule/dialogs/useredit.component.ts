import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { UserModel } from '../../../../libs/entities/UserModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminRestService } from '../../services/adminrest.service';
import { pwCore } from '../../pw-core';

@Component({
    selector: 'app-user-edit',
    template: require('./useredit.component.html'),
    styleUrls: []
})
export class UserEditComponent implements OnChanges {

    changePwdVisible = false;
    allStudents: any[];
    PARENTS_ROLE: any;
    STUDENT_ROLE: any;
    selectedOffspring: any[];
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<UserModel>();

    visible: boolean;

    constructor(private arest: AdminRestService) {
        this.STUDENT_ROLE = pwCore.UserRoles.student;
        this.PARENTS_ROLE = pwCore.UserRoles.parents;
    }


    ngOnChanges(changes: SimpleChanges): void {
        const _formGroup: SimpleChange = changes.formGroup;
        if (_formGroup.currentValue) {
            const user = _formGroup.currentValue.value;
            const idSchool = user.idSchool;
            this.arest.getUsersInSchool(idSchool, this.STUDENT_ROLE).subscribe((data: any[]) => {
                this.allStudents = data;
                this.selectedOffspring = [];
                (user._offspring ||  []).forEach(element => {
                    this.selectedOffspring = this.allStudents.filter((s) => s.id === element.idChild);
                });
            });

            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    onSubmitUser(user) {
        // Update offspring
        user._offspring = (this.selectedOffspring || []).map((element) => {
            return { idParent: user.id, idChild: element.id };
        });
        // must delete password field if not set
        if (!user.password || !this.changePwdVisible) {
            delete user.password;
        }
        this.arest.saveUser(user).subscribe((data: any) => {
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

    close() {
        this.visible = false;
        this.formGroup = null;
    }
    
    togglePwdBtn() {
        this.changePwdVisible = !this.changePwdVisible;       
    }
}