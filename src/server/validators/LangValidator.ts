import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { I18n } from '../services/I18n';

@ValidatorConstraint({ name: "lang", async: false })
export class LangValidator implements ValidatorConstraintInterface {

    validate(lang: string, args: ValidationArguments) {
        return I18n.SUPPORTED_LANGS.indexOf(lang) >= 0;
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "The language ($value) is unsupported.";
    }

}