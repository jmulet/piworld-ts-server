 
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'; 
import { SelectItemDisable } from '../SelectItemDisable';

export const UnitVisibility = {
    Hidden: 0,
    Collapsed: 1,
    Auto: 2,
    Expanded: 3
}

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
export class VisibilityPickerComponent implements OnInit, OnChanges {
   
    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() visible: number;
    @Input() type: string;
    @Input() style: string;
    @Output() visibleChange = new EventEmitter<number>();

    constructor() {                
    }
    ngOnInit() {       
       
        this.selected= this.list.filter((r)=>r.value===this.visible)[0] || this.list[0];    
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.list = [
            {label: "Hidden", value: 0},
            {label: "Visible", value: 1}
        ];
        if (changes.type) {
            if (this.type === "unit") {
                this.list = [];
                for (let key in UnitVisibility) {
                    this.list.push({label: key, value: UnitVisibility[key]});
                }
            } 
        }
        if (changes.visible) {
            this.selected= this.list.filter((r)=>r.value===this.visible)[0] || this.list[0];    
        }
    } 
    onChange() {
        this.visibleChange.emit(this.selected.value);    
    }
}