import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { UserRoles } from "../entities/UserModel";

@ValidatorConstraint({ name: "idRole", async: false })
export class RoleValidator implements ValidatorConstraintInterface {

    validate(idRole: number, args: ValidationArguments) {
        const values = Object.keys(UserRoles).map( (key) => UserRoles[key] );
        const constraints = args.constraints || [];
        const callerIdRole = constraints[0] || UserRoles.teacher_nonediting;
        let valid = values.indexOf(idRole) >= 0; 
        valid = valid && (callerIdRole <= idRole); // Never a teacher can create an admin; etc...
        return valid;
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "idRole ($value) is invalid or unathorized!";
    }

}