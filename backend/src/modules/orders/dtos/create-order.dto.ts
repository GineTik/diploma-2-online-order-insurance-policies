import {
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsString,
	Validate,
	ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsValidValueType } from '@shared/validators';

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

	@ApiProperty({
		description: 'The price of the policy',
		example: 100,
	})
	@IsNumber()
	@IsNotEmpty()
	price: number;
}

export class FieldValueDto {
	@IsString()
	@IsNotEmpty()
	key: string;

	@Validate(IsValidValueType)
	@IsNotEmpty()
	value: string | boolean | number;
}
