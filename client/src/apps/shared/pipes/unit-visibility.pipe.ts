
import { Pipe, PipeTransform } from '@angular/core'; 
import { pwCore } from '../../admin/pw-core';
import { UnitVisibility } from '../components/visibilityPicker.component';

@Pipe({
    name: 'unitVisibility',
})

export class UnitVisibilityPipe implements PipeTransform {
 
    transform(value: string, args: any[]): any {
        return Object.keys(UnitVisibility).find(key => UnitVisibility[key] == value);
    }

}