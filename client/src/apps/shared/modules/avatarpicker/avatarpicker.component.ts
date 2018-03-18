 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { SelectItemDisable } from '../../SelectItemDisable';
import { pwCore } from '../../../admin/pw-core';
 
 
@Component({
    selector: 'app-avatar-picker',
    template: `
    <p-dropdown [options]="list" [(ngModel)]="selected" optionLabel="label" (onChange)="onChange()" [style]="style">
    <ng-template let-option pTemplate="item">
        <div>
            <div [ngClass]="option.disabled?'disabled':''"><img [src]="option.label"/></div>
        </div>
    </ng-template>
    </p-dropdown>
    `,
    styles: [`
        .disabled {
            background-color: '#ccc';
            cursor: 'default';
        }
    `]
})
export class AvatarPickerComponent implements OnInit {
    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() avatar: number;
    @Input() style: string;
    @Output() avatarChange = new EventEmitter<number>();

    constructor() {        
    }
    ngOnInit() {       
        const staticPrefix = pwCore.Config.staticPrefix;
        this.list = [];
        for (var i=0; i<50; i++) {
            this.list.push({value: i, label: staticPrefix + "/assets/img/avatar/" + i + ".png"});
        } 
        this.selected= this.list.filter((r)=>r.value===this.avatar)[0] || this.list[0];    
    } 
    onChange() {
        this.avatarChange.emit(this.selected.value);    
    }
}