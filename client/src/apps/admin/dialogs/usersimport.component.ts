import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { SchoolModel } from '../../../libs/entities/SchoolModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminRestService } from '../services/adminrest.service';

@Component({
    selector: 'app-users-import',
    template: require('./usersimport.component.html'),
    styleUrls: []
})
export class UsersImportComponent implements OnChanges {
   
    selectedTab: number;
    serverValidationErrors: any;
    isSubmit: boolean;
    msg: string;
    PARENTS_ROLE: any;
    STUDENT_ROLE: any;
    model: { csv: string; idSchool: any; updateIfExists: boolean; idRole: any; mustChgPwd: boolean; };
    @Input() center: SchoolModel;
    @Output() onSave = new EventEmitter<void>();
    
    visible: boolean;
   
    constructor(private arest: AdminRestService){
        this.STUDENT_ROLE = window["pwCore"]["UserRoles"].student;
        this.PARENTS_ROLE = window["pwCore"]["UserRoles"].parents;
        this.selectedTab = 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const _center: SimpleChange = changes.center;
        if (_center.currentValue) {
            this.model = { csv: "", idSchool: this.center.id, updateIfExists: false, idRole: this.STUDENT_ROLE, mustChgPwd: false };
            this.visible = true;
            this.isSubmit = false;
            this.msg = "";
            this.selectedTab = 0;
        } else {
            this.visible = false;
        } 
    }
    
    onSubmit() {
        this.isSubmit = true;
        this.arest.importUsers(this.model).subscribe((data: any[])=>{
            this.msg = data.join("<br/>");
            this.selectedTab = 1;
            this.isSubmit  = true;
            this.onSave.emit();
        }, (err: any)=> {
            this.serverValidationErrors = err.msg;
        })
    }


    
}