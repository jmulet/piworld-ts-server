 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { SelectItemDisable } from '../SelectItemDisable';
 
@Component({
    selector: 'app-courselevels-picker',
    template: `
    <p-dropdown [options]="list" [(ngModel)]="selected" optionLabel="label" (onChange)="onChange()" appendTo="body" [style]="style">
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
export class CourseLevelPickerComponent implements OnInit {
    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() level: number;
    @Input() style: string;
    @Output() levelChange = new EventEmitter<number>();

    constructor() {        
    }
    ngOnInit() {       
        this.list = [
            {label: "1r", value: 1},
            {label: "2n", value: 2},
            {label: "3r", value: 3},
            {label: "4t", value: 4}
        ]
        this.selected= this.list.filter((r)=>r.value===this.level)[0] || this.list[0];    
    } 
    onChange() {
        this.levelChange.emit(this.selected.value);    
    }
}