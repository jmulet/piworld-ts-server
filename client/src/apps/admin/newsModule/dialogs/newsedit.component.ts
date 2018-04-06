import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NewsModel } from '../../../../entities/NewsModel';
import { SchoolModel } from '../../../../entities/SchoolModel';
import { RestApi } from '../../../../rest/RestApi';
import { TranslateService } from '../../../shared/services/translate.service';


@Component({
    selector: 'app-news-edit',
    templateUrl: './newsedit.component.html',
    styleUrls: []
})
export class NewsEditComponent implements OnChanges {
    locale: any;
    amiRoot: boolean;
    availableLangs: any[];
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<SchoolModel>();

    visible: boolean;

    constructor(private rest: RestApi, private translate: TranslateService) {     
        this.locale = translate.getCalendarLocale();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const _formGroup: SimpleChange = changes.formGroup;
        if (_formGroup.currentValue) {
            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    onSubmit(news: NewsModel) {
        this.rest.ApiNews.save(news).subscribe((data: any) => {           
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