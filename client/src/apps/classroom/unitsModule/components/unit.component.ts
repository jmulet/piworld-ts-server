import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core'; 
import { UnitModel } from '../../../../entities/UnitModel';
import { RestApi } from '../../../../rest/RestApi';
 

@Component({
    selector: 'app-unit-component',
    templateUrl: './unit.component.html',
    styles: [ ]
})
export class UnitComponent implements OnInit, OnChanges {
    
    @Input()
    unit: UnitModel;

    collapsed = false;
    
    constructor(private rest: RestApi) {
    }
    ngOnInit() {
      
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes.unit) {
            console.log("unit changed")   
        }
    }
}