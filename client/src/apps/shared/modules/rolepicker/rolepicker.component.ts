 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { SelectItemDisable } from '../../SelectItemDisable';


@Component({
    selector: 'app-role-picker',
    template: `
    <p-dropdown [options]="rolesList" [(ngModel)]="selectedRole" optionLabel="label" (onChange)="onChange()" appendTo="body" [style]="style">
    <ng-template let-option pTemplate="item">
        <div>
            <div (click)="onClick(option)" [ngClass]="option.disabled?'disabled':''">{{option.label}}</div>
        </div>
    </ng-template>
    </p-dropdown>
    `,
    styles: [`
        .disabled {
            color: '#ccc';
            cursor: 'default';
        }
    `]
})
export class RolePickerComponent implements OnInit {
    lastRole: SelectItemDisable;
    rolesList: SelectItemDisable[];
    selectedRole: SelectItemDisable;
    @Input() idRole: number;
    @Input() style: string;
    @Input() all: boolean;
    @Output() idRoleChange = new EventEmitter<number>(); 

    constructor() {        
    }
    ngOnInit() {       
        this.rolesList = window["pwCore"]["UserRolesList"]();
        if (this.all) {
            this.rolesList.unshift({label: "*", value: -1, disabled: false});
        }
        this.selectedRole = this.rolesList.filter((r)=>r.value===this.idRole)[0] || this.rolesList[0];
        this.lastRole = this.selectedRole;
    }
    onClick(role) {  
        if (role.disabled) {
            this.selectedRole = this.lastRole;
        }      
    }
    onChange() {
        if(!this.selectedRole.disabled) {
            this.idRoleChange.emit(this.selectedRole.value);
            this.lastRole = this.selectedRole;
        }
    }
}