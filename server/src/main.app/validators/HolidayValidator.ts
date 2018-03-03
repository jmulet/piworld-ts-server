import { Validator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { HolidayModel } from '../entities/HolidayModel';
 

@ValidatorConstraint({ name: "holiday", async: false })
export class HolidayValidator implements ValidatorConstraintInterface {
 
    validate(value: number, args: ValidationArguments) {       
        const holiday = args.object; 
        const fromDate = new Date(holiday["fromDate"]);
        const toDate = new Date(holiday["toDate"]);
        if (!fromDate || !toDate) {
            return false;
        }
        return toDate.getTime() >= fromDate.getTime();
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "In holiday table must be toDate >= fromDate; both not null";
    }

}