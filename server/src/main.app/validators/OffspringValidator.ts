import { Validator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { OffspringModel } from '../entities/OffspringModel';
 


@ValidatorConstraint({ name: "offspring", async: false })
export class OffspringValidator implements ValidatorConstraintInterface {
 
    validate(value: number, args: ValidationArguments) {       
        const offspringObject = args.object; 
        return offspringObject["idChild"] != offspringObject["idParent"];
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "In offspring table must be idChild != idParent";
    }

}

 