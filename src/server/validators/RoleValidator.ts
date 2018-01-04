import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { UserRoles } from "../entities/UserModel";

@ValidatorConstraint({ name: "idRole", async: false })
export class RoleValidator implements ValidatorConstraintInterface {

    validate(idRole: number, args: ValidationArguments) {
        const values = Object.keys(UserRoles).map( (key) => UserRoles[key] );
        return values.indexOf(idRole) >= 0; 
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "idRole ($value) is invalid!";
    }

}