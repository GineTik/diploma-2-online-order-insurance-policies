import {
	ValidatorConstraintInterface,
	ValidatorConstraint,
	ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'valid-value-type', async: false })
export class IsValidValueType implements ValidatorConstraintInterface {
	validate(text: any, args: ValidationArguments) {
		return (
			typeof text === 'boolean' ||
			typeof text === 'string' ||
			typeof text === 'number'
		);
	}

	defaultMessage(args: ValidationArguments) {
		return '($value) must be boolean or string or number';
	}
}
