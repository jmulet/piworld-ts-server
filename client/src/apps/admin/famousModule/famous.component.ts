import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
 
import { RestApi } from '../../../rest/RestApi';
import { pwCore } from '../../shared/pw-core';
import { OverlayPanel } from 'primeng/components/overlaypanel/overlaypanel';
import { FamousEqnModel } from '../../../entities/FamousEqnModel';
import { FamousQuoteModel } from '../../../entities/FamousQuoteModel';


@Component({
    selector: 'app-famous-component',
    templateUrl: './famous.component.html',
    styleUrls: []
})
export class FamousComponent implements OnInit { 
    opQuoteData: FamousQuoteModel;
    opEqnData: FamousEqnModel;
    inputDlgText: string;
    inputDlgType: string;
    inputDlgContent: string;
    inputDlgHeader: string;
    inputDlgShow: boolean;
    famous: any = {}; // holds equation and quote
    equationForm: FormGroup;
    quoteForm: FormGroup;
    equationEdt: FamousEqnModel;
    quoteEdt: FamousQuoteModel;

    constructor(private rest: RestApi, private confirmationService: ConfirmationService,
        private fb: FormBuilder) {
    }
    ngOnInit() {
        this.reload("equation");
        this.reload("quote");
    }
    reload(type: string) {
        this.rest.ApiFamous.list(type).subscribe((data: any[]) => {
            this.famous[type] = data;
        });
    } 
    reloadEquations(evt) {
        this.reload('equation');
    }
    reloadQuotes(evt) {
        this.reload('quote');   
    }
    remove(type: string, famous: FamousEqnModel | FamousQuoteModel) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to this '+ type + '?',
            accept: () => { 
                this.rest.ApiFamous.delete(type, famous.id).subscribe((data) =>  {                    
                    this.reload(type);
                });
            }
        });
    }
    editEquation(famous?: FamousEqnModel) {
        this.equationEdt = new FamousEqnModel().setObj(famous);
        if (!this.equationEdt.id) {          
            this.equationEdt.idUserCreator = pwCore.User.id;
        }
        this.equationForm = this.equationEdt.toForm(this.fb);
    }
    editQuote(famous?: FamousQuoteModel) {
        this.quoteEdt = new FamousQuoteModel().setObj(famous);
        if (!this.quoteEdt.id) {          
            this.quoteEdt.idUserCreator = pwCore.User.id;
        }
        this.quoteForm = this.quoteEdt.toForm(this.fb);
    }
    createEquation() {
        this.editEquation();
    }   
    createQuote() {
        this.editQuote();
    }    
    massiveImport(type: string) {       
        this.inputDlgHeader = "Massive import " + type;
        if (type === "equation") {
            this.inputDlgContent = "Use this format:<br/> [eqn] E=mc^2 <br/>[title] Einstein equation <br/>[url] https://www.google.es<br/>[eqn] ...";
        } else {
            this.inputDlgContent = "Use this format:<br/> [quote] To be or not to be. That's the question <br/>[author] William Shakespeare <br/>[url] https://www.google.es<br/>[quote] ...";;
        }
        this.inputDlgText = "";
        this.inputDlgType = type
        this.inputDlgShow = true; 
    }
    inputDlgClosed = function(evt) {
        console.log(evt, this.inputDlgText);
        if (evt.accept) {
            this.rest.ApiFamous.massiveImport(this.inputDlgType, {text: evt.input}).subscribe((data) => {
                this.reload(this.inputDlgType);
            });
        }
    }
}