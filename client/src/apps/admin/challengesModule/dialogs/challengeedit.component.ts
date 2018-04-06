
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FamousEqnModel } from '../../../../entities/FamousEqnModel';
import { RestApi } from '../../../../rest/RestApi';
import { ChallengesModel } from '../../../../entities/ChallengesModel';
import { TranslateService } from '../../../shared/services/translate.service';


@Component({
    selector: 'app-challenge-edit',
    templateUrl: './challengeedit.component.html',
    styleUrls: []
})
export class ChallengeEditComponent implements OnChanges {
    
    locale: any;
    serverValidationErrors: any;
    @Input() formGroup: FormGroup;
    @Output() onSave = new EventEmitter<ChallengesModel>();

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

    onSubmit(entity: ChallengesModel) {
        this.rest.ApiChallenges.save(entity).subscribe((data: any) => {           
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