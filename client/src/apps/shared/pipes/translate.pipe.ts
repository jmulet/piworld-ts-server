
import { Pipe, PipeTransform } from '@angular/core'; 
import { pwCore } from '../pw-core';

@Pipe({
    name: 'translate',
})

export class TranslatePipe implements PipeTransform {
 
    transform(value: string, args: any[]): any {
        if (!value) return;
        return pwCore.__(value);
    }
}