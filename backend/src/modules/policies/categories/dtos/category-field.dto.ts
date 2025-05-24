import { IsArray, IsOptional, IsString } from 'class-validator';

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
}
