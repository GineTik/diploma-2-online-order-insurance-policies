import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class CategoryFieldDto {
	@IsString()
	label: string;

	@IsString()
	type: string;

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	values?: string[];

	@IsString()
	@IsOptional()
	placeholder?: string;

	@IsNumber()
	@Min(0)
	@IsOptional()
	price?: number;
}

export class OldCategoryFieldDto extends OmitType(CategoryFieldDto, [
	'values',
]) {
	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	values?: string[];
}

export class FieldValueDto {
	@IsString()
	label: string;

	@IsNumber()
	@Min(0)
	price: number;
}
