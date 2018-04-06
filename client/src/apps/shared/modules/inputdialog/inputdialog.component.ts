import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'; 
import { SelectItemDisable } from '../../SelectItemDisable';
import { pwCore } from '../../pw-core';
 
 
@Component({
    selector: 'p-input-dialog',
    template: `
    <p-dialog [(visible)]="visible" resizable="true" [style]="{width: '500px'}" responsive="true" (onHide)="onHide($event)">
        <p-header *ngIf="header">
            {{header}}
        </p-header>
            <div *ngIf="message" [innerHtml]="message"></div>
            <input *ngIf="mode==='input'" type="text" style="width:100%" [(ngModel)]="input"/>
            <textarea *ngIf="mode==='textarea'" style="width:100%" [(ngModel)]="input" rows=5>
            </textarea>
        <p-footer>
            <button class="btn btn-sm btn-info" type="button" (click)="onResolve(true)" label="Yes"><span class="fa fa-check"></span> Yes</button>
            <button class="btn btn-sm btn-info" type="button" (click)="onResolve(false)" label="No"><span class="fa fa-close"></span> No</button>
        </p-footer>
    </p-dialog>
    `,
    styles: []
})
export class InputDialogComponent implements OnInit, OnChanges {
  
    list: SelectItemDisable[];
    selected: SelectItemDisable;
    @Input() visible: boolean;
    @Input() message: string;
    @Input() header: string;
    @Input() mode: string;
    @Input() input: string;    
    @Output() onClose = new EventEmitter<any>();
    @Output() inputChange = new EventEmitter<string>();
    @Output() visibleChange = new EventEmitter<boolean>();

    ngOnInit() {       
         this.mode = this.mode || "input";
    } 
    ngOnChanges(changes: SimpleChanges): void {        
    }
    onResolve(accept) {         
        this.visible = false;
        this.visibleChange.emit(false);
        this.inputChange.emit(this.input);
        this.onClose.emit({
            accept: accept,
            input: this.input
        });
    }
    onHide(){
        this.visibleChange.emit(false);
    }
}