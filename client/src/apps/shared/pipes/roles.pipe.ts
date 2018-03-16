
import { Pipe, PipeTransform } from '@angular/core'; 

@Pipe({
    name: 'roles',
})

export class RolesPipe implements PipeTransform {
 
    transform(value: string, args: any[]): any {
        if (!value) return;
        const object = window["pwCore"]["UserRoles"];
        return Object.keys(object).find(key => object[key] === value);
    }

}