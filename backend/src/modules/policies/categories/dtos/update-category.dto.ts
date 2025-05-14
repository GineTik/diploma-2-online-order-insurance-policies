import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
	@ApiProperty({
		description: 'The name of the category',
		example: 'Health Insurance',
	})
	@IsString()
	@IsOptional()
	name: string;

	@ApiProperty({
		description: 'The slug of the category',
		example: 'health-insurance',
	})
	@IsString()
	@IsOptional()
	slug: string;

	@ApiProperty({
		description: 'The description of the category',
		example:
			'Health insurance is a type of insurance that covers medical expenses.',
	})
	@IsString()
	@IsOptional()
	description: string;
}
