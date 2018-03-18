 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { SelectItemDisable } from '../SelectItemDisable';
import { RestService } from '../services/rest.service';
import { SubjectModel } from '../../../libs/entities/SubjectModel';
 
@Component({
    selector: 'app-subject-picker',
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
export class SubjectPickerComponent implements OnInit {
    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() idSubject: number;
    @Input() style: string;
    @Output() idSubjectChange = new EventEmitter<number>();

    constructor(private rest: RestService) {        
    }
    ngOnInit() {       
        this.rest.listSubjects().subscribe( (data: SubjectModel[]) => {

            this.list = data.map( (e: SubjectModel) => { 
                return {label: e.longname, value: e.id, disabled: false}; 
            });
            this.selected= this.list.filter((r)=>r.value===this.idSubject)[0] || this.list[0];    

        }) 
        
    } 
    onChange() {
        this.idSubjectChange.emit(this.selected.value);    
    }
}