import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core'; 
import { SectionModel } from '../../../entities/SectionModel';
import { RestApi } from '../../../rest/RestApi';

@Component({
    selector: 'app-section-html',
    template: require('./sectionhtml.component.html'),
    styles: [`
        .section-html {
            border-radius: 5px;
            border: 1px solid lightblue;
            padding: 5px;
            margin: 0;
        }
    `]
})
export class SectionHtmlComponent implements OnInit, OnChanges {
    
    @Input()
    section: SectionModel;

    collapsed = false;
    
    constructor(private rest: RestApi) {
    }

    ngOnInit() {
      
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes.section) {
            console.log("section changed")   
        }
    }
}