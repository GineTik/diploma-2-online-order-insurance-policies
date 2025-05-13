import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty({
		description: 'The name of the category',
		example: 'Health Insurance',
	})
	@IsString()
	name: string;

	@IsString()
	slug: string;

	@IsString()
	description: string;
}
