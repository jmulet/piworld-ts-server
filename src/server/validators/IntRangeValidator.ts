import { Validator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
 

@ValidatorConstraint({ name: "intMinMax", async: false })
export class IntRangeValidator implements ValidatorConstraintInterface {

    validator = new Validator();
    
    validate(num: number, args: ValidationArguments) {
        //args object
        /*
        { targetName: 'SchoolModel',
        property: 'canPublish',
        object:
        SchoolModel {
            id: 0,
            schoolName: '',
            professorName: '',
            professorEmail: '',
            language: 'ca',
            enrollpassword: '230vcxcnl',
            canEnroll: 1,
            canPublish: 1 },
        value: 1,
        constraints: [ 0, 1 ] }
        console.log("intMax", num, args);
        if (!this.validator.isInt(num)) {
            return false;
        }
        */
        const min = args.constraints[0];
        const max = args.constraints[1];
        return min <= num && num <= max;
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "The number ($value) is not in range " +  args[0] + "-"+ args[1];
    }

}