 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { SelectItemDisable } from '../SelectItemDisable';
 
@Component({
    selector: 'app-coursestudies-picker',
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
export class CourseStudiesPickerComponent implements OnInit {
    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() studies: number;
    @Input() style: string;
    @Output() studiesChange = new EventEmitter<number>();

    constructor() {        
    }
    ngOnInit() {       
        this.list = [
            {label: "ESO", value: "ESO"},
            {label: "BATX", value: "BAT"},
            {label: "BATX CS", value: "BATCS"},            
        ]
        this.selected= this.list.filter((r)=>r.value===this.studies)[0] || this.list[0];    
    } 
    onChange() {
        this.studiesChange.emit(this.selected.value);    
    }
}