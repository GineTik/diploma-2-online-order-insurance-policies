import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { CategoryFieldDto } from './category-field.dto';
import { Type } from 'class-transformer';

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

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CategoryFieldDto)
	fields: CategoryFieldDto[];
}
