
import { Pipe, PipeTransform } from '@angular/core'; 
import { pwCore } from '../pw-core';

@Pipe({
    name: 'roles',
})

export class RolesPipe implements PipeTransform {
 
    transform(value: string, args: any[]): any {
        if (!value) return;
        const object = pwCore.UserRoles;
        return Object.keys(object).find(key => object[key] === value);
    }

}