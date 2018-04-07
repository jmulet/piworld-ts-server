
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SelectItemDisable } from '../../SelectItemDisable';
import { HttpClient } from '@angular/common/http';
import { pwCore } from '../../pw-core';

@Component({
    selector: 'app-course-picker',
    template: `
    <p-dropdown [options]="list" [(ngModel)]="selected" optionLabel="label" (onChange)="selectionChanged()" appendTo="body" [style]="style">
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
export class CoursePickerComponent implements OnInit, OnChanges {

    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() idCourse: number;
    @Input() style: string;
    @Output() idCourseChange = new EventEmitter<number>();

    constructor(private $http: HttpClient) {
    }
    loadCourses() {
        this.$http.get(pwCore.Config.basePrefix + "/api/course/list/" + pwCore.User.id + "?created=true").subscribe((data: any[]) => {
            this.list = data;
            this.selected = this.list.filter((r) => r.value === this.idCourse)[0] || this.list[0];
        });
    }
    ngOnInit(): void {
        this.loadCourses();
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes.idCourse) {
            if (this.list) {
                this.selected = this.list.filter((r) => r.value === this.idCourse)[0] || this.list[0];
            } else {
                this.loadCourses();
            }
        }
    }
    selectionChanged() {
        this.idCourseChange.emit(this.selected.value);
    }
    onClick(disabled: boolean) {
        if(disabled) {
            event.stopPropagation();
        }
    }
}