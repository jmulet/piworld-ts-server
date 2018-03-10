
import { Pipe, PipeTransform } from '@angular/core'; 

@Pipe({
    name: 'translate',
})

export class TranslatePipe implements PipeTransform {
 
    transform(value: string, args: any[]): any {
        if (!value) return;
        return window["pwCore"]["__"](value);
    }
}