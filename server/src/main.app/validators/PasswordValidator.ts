import { Validator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
 

@ValidatorConstraint({ name: "passwordValidator", async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  
    validate(password: string, args: ValidationArguments) {       
        if (password == null) {
            if (!args.object["id"]) {
                return false;
            } else {
                return true;
            }
        }
        const constraints = args.constraints || [];

        const minim = constraints[0] || 4;
        const lettersAndNumbers = constraints[1] || true;
        let isValid = (password.length >= minim);
        if ( lettersAndNumbers ) {
            isValid = isValid && ( password.search(/\d/) >= 0 ) && ( password.search(/[a-zA-Z]/) >= 0 );
        }
        return isValid;  
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        const constraints = args.constraints || [];

        const minim = constraints[0] || 4;
        const lettersAndNumbers = constraints[1] || true;
        let msg = "The password must contain at least " + minim+ " characters";
        if ( lettersAndNumbers ) {
         msg += " and must include letters and numbers";
        }
        return msg;
    }

}