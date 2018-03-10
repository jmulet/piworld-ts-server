 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
 
interface SelectItemDisable {
    value: any;
    label: string;
    disabled?: boolean;
}

export enum UserStatus {
    disabled = 0,
    enabled = 1,
    pending = -1
}

@Component({
    selector: 'app-status-picker',
    template: `
    <p-dropdown [options]="list" [(ngModel)]="selected" optionLabel="label" (onChange)="onChange()">
    <ng-template let-option pTemplate="item">
        <div>
            <div [ngClass]="option.disabled?'disabled':''">{{option.label}}</div>
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
export class StatusPickerComponent implements OnInit {
    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() status: number;
    @Output() statusChange = new EventEmitter<number>();

    constructor() {        
    }
    ngOnInit() {       
        this.list = [
            {label: "Disabled", value: 0},
            {label: "Pending", value: -1},
            {label: "Enabled", value: 1}
        ]
        this.selected= this.list.filter((r)=>r.value===this.status)[0] || this.list[0];    
    } 
    onChange() {
        this.statusChange.emit(this.selected.value);    
    }
}