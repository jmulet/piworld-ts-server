import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FamousQuoteModel } from '../../../../entities/FamousQuoteModel';
import { RestApi } from '../../../../rest/RestApi';


@Component({
    selector: 'app-quote-edit',
    templateUrl: './quoteedit.component.html',
    styleUrls: []
})
export class QuoteEditComponent implements OnChanges {   
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<FamousQuoteModel>();

    visible: boolean;

    constructor(private rest: RestApi){
    }

    ngOnChanges(changes: SimpleChanges): void {
        const _formGroup: SimpleChange = changes.formGroup;
        if (_formGroup.currentValue) {
            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    onSubmit(entity: FamousQuoteModel) {
        this.rest.ApiFamous.saveQuote(entity).subscribe((data: any) => {           
            if (data.id) {               
                this.onSave.emit(this.formGroup.value);
            }
            this.visible = false;
        },
            (err) => {
                this.serverValidationErrors = err.message;
                console.log(err);
            })
    }

    close(){
        this.visible = false; 
    }
}