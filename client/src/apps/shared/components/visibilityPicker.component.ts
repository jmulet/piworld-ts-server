 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { SelectItemDisable } from '../SelectItemDisable';
 
@Component({
    selector: 'app-visibility-picker',
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
export class VisibilityPickerComponent implements OnInit {
    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() visible: number;
    @Input() type: string;
    @Input() style: string;
    @Output() visibleChange = new EventEmitter<number>();

    constructor() {        
    }
    ngOnInit() {       
        if (this.type === "unit") {
            this.list = [
                {label: "Hidden", value: 0},
                {label: "Collapsed", value: 1},
                {label: "Auto", value: 2},
                {label: "Expanded", value: 3}
            ];
        } else {
            this.list = [
                {label: "Hidden", value: 0},
                {label: "Visible", value: 1}
            ];
        }
        this.selected= this.list.filter((r)=>r.value===this.visible)[0] || this.list[0];    
    } 
    onChange() {
        this.visibleChange.emit(this.selected.value);    
    }
}