import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { UserRoles } from "../entities/UserModel";

@ValidatorConstraint({ name: "opts", async: false })
export class JsonStringValidator implements ValidatorConstraintInterface {

    validate(opts: string, args: ValidationArguments) {
        try {
            const optsObj = JSON.parse(opts);
            return true;
        } catch(Ex) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "The string ($value) is an invalid JSON!";
    }

}