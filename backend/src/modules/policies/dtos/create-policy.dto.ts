import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreatePolicyDto {
	@IsString()
	name: string;

	@IsString()
	slug: string;

	@IsString()
	description: string;

	@IsNumber()
	price: number;

	@IsString()
	categoryId: string;

	@IsArray()
	@IsString({ each: true })
	options: string[];
}
