 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { SelectItemDisable } from '../../SelectItemDisable'; 
 

@Component({
    selector: 'app-level-picker',
    template: `
    <p-dropdown [options]="list" [(ngModel)]="selected" optionLabel="label" (onChange)="onChange()" appendTo="body" [style]="style">
    <ng-template let-option pTemplate="item">
        <div>
            <div (click)="onClick(option.disabled)" [ngClass]="option.disabled?'disabled':''">{{option.label}}</div>
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
export class LevelPickerComponent implements OnInit {
    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() status: number;
    @Input() style: string;
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
    onClick(disabled: boolean) {
        if(disabled) {
            event.stopPropagation();
        }
    }
}