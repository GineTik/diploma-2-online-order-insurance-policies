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
}
