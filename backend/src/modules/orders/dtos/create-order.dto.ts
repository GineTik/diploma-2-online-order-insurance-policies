import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
	@ApiProperty({
		description: 'The slug identifier of the insurance policy',
		example: 'health-insurance-basic',
	})
	@IsString()
	@IsNotEmpty()
	policySlug: string;

	@ApiProperty({
		description: 'The unique identifier of the user creating the order',
		example: '507f1f77bcf86cd799439011',
	})
	@IsString()
	@IsNotEmpty()
	userId: string;
}
