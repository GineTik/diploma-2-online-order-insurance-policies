import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsString,
	Validate,
	ValidateNested,
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsStringOrBoolean } from '@shared/validators';

export class CreateOrderDto {
	@ApiProperty({
		description: 'The slug identifier of the insurance policy',
		example: 'health-insurance-basic',
	})
	@IsString()
	@IsNotEmpty()
	policySlug: string;

	@ApiProperty({
		description: 'The fields of the policy',
		example: [{ key: 'name', value: 'John Doe' }],
	})
	@IsArray()
	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => FieldValueDto)
	informations: FieldValueDto[];
}

export class FieldValueDto {
	@IsString()
	@IsNotEmpty()
	key: string;

	@Validate(IsStringOrBoolean)
	@IsNotEmpty()
	value: string | boolean;
}
