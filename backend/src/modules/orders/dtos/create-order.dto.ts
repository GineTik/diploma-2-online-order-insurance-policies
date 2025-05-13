import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
	information: FieldValueDto[];
}

export class FieldValueDto {
	@IsString()
	@IsNotEmpty()
	key: string;

	@IsString()
	@IsNotEmpty()
	value: string;
}
