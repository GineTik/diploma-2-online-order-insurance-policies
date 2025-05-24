import {
	ValidatorConstraintInterface,
	ValidatorConstraint,
	ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'string-or-boolean', async: false })
export class IsStringOrBoolean implements ValidatorConstraintInterface {
	validate(text: any, args: ValidationArguments) {
		return typeof text === 'boolean' || typeof text === 'string';
	}

	defaultMessage(args: ValidationArguments) {
		return '($value) must be boolean or string';
	}
}
