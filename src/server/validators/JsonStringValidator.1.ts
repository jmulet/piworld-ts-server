import { Validator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
 

@ValidatorConstraint({ name: "intMinMax", async: false })
export class IntRangeValidator implements ValidatorConstraintInterface {

    validator = new Validator();
    
    validate(num: number, args: ValidationArguments) {
        if (!this.validator.isInt(num)) {
            return false;
        }
        const min = args[0];
        const max = args[1];
        return min <= num && num <= max;
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "The number ($value) is not in range " +  args;
    }

}