import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { TranslateService } from '../../../shared/services/translate.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { SchoolModel } from '../../../../entities/SchoolModel';
import { RestApi } from '../../../../rest/RestApi';
import { HolidayModel } from '../../../../entities/HolidayModel';
import { TermsModel } from '../../../../entities/TermsModel';


@Component({
    selector: 'app-center-opts',
    templateUrl: './centeropts.component.html',
    styleUrls: []
})
export class CenterOptsComponent implements OnChanges {
    availableTerms: SelectItem[];
    locale: any;
    terms: any[];
    holidays: any[];
    @Input() school: SchoolModel; 
    visible: boolean;
    tabIndex: number = 0;

    constructor(private rest: RestApi, private confirm: ConfirmationService,
                private translate: TranslateService, private growl: MessageService) {
                    
        this.locale = this.translate.getCalendarLocale();
        this.availableTerms = [
            {label: "1a Avaluació", value: 1},
            {label: "2a Avaluació", value: 2},
            {label: "Ordinària", value: 3},
            {label: "Extraordinària", value: 4}
        ]
    }

    termToStr(n: number) {
        const opt = this.availableTerms.filter((e) => e.value===n)[0];
        return opt? opt.label : "";
    }

    ngOnChanges(changes: SimpleChanges): void {
        const school: SimpleChange = changes.school;
        if (school.currentValue) {
            this.visible = true;
        } else {
            this.visible = false;
        }
        this.reloadHolidays();
        this.reloadTerms();
    }

    //------------ Holiday methos

    reloadHolidays() {
        if (!this.school) {
            this.holidays = [];
            return;
        }
        this.rest.ApiSchoolHoliday.list(this.school.id, this.school.sopts.year).subscribe((data: any[])=> this.holidays = data);
    }

    removeHoliday(holiday: HolidayModel) {
        if (!holiday.id) {
            const index = this.holidays.indexOf(holiday);
            this.holidays.splice(index, 1);
            return;
        }
        this.confirm.confirm({
            message: 'Are you sure that you want to delete this holiday entry?',
            accept: () => {
                this.rest.ApiSchoolHoliday.delete(holiday.id).subscribe((data)=> this.reloadHolidays());
            }
        });
       
    }

    editHoliday(holiday: HolidayModel) {
        holiday["_backup"] = {...holiday}; 
    }

    cancelHoliday(holiday: HolidayModel) {
        const index = this.holidays.indexOf(holiday);
        if (index >= 0) {
            this.holidays[index] = {...holiday["_backup"]}
        }
        delete holiday["_backup"];
    }

    saveHoliday(holiday: HolidayModel) {
        let msg;
        if (holiday.fromDate==null || holiday.toDate==null) {
            msg = "fromDate and toDate are both required";
        } else if (holiday.fromDate > holiday.toDate) {
            msg = "fromDate must be before toDate";
        }
        if (msg) {
            this.growl.add({severity: "warning", detail: "msg", summary: "Check errors"});
            return;
        }
        delete holiday["_backup"];
        this.rest.ApiSchoolHoliday.save(holiday).subscribe((data) => this.reloadHolidays());
    }

    
    //------------ Term methos

    reloadTerms() {
        if (!this.school) {
            this.terms = [];
            return;
        }
        this.rest.ApiSchoolTerm.list(this.school.id, this.school.sopts.year).subscribe((data: any[])=> this.terms = data);
    }

    removeTerm(term: TermsModel) {
        this.rest.ApiSchoolTerm.delete(term.id).subscribe((data)=> this.reloadTerms());
    }

    editTerm(term: TermsModel) {
        term["_backup"] = {...term}; 
    }

    cancelTerm(term: TermsModel) {
        const index = this.terms.indexOf(term);
        if (index >= 0) {
            this.terms[index] = {...term["_backup"]}
        }
        delete term["_backup"];
    }

    saveTerm(term: TermsModel) {
        let msg;
        const count = this.terms.filter((e)=>e.term===term.term).length;
        if (term.fromDate==null || term.toDate==null) {
            msg = "fromDate and toDate are both required";
        } else if (term.fromDate > term.toDate) {
            msg = "fromDate must be before toDate";
        } else if(count > 1) {
            msg = "The term "+ this.termToStr(term.term) + " is already defined";
        }
        if (msg) {
            this.growl.add({severity: "warning", detail: "msg", summary: "Check errors"});
            return;
        }
        delete term["_backup"];
        this.rest.ApiSchoolTerm.save(term).subscribe((data) => this.reloadTerms());
    }

    tabChanged(ev){
        this.tabIndex = ev.index;
    }
     
    create() {  
        if(this.tabIndex===0) {
            const entity = new HolidayModel();
            entity.idSchool = this.school.id;
            entity.year = this.school.sopts.year;
            this.holidays.push(entity);
        } else {
            const entity = new TermsModel();
            entity.idSchool = this.school.id;
            entity.year = this.school.sopts.year;
            entity.term = 1;
            this.terms.push(entity);
        }
    }
}