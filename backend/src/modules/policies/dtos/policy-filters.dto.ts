import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum PolicySort {
	PRICE_ASC = 'price-asc',
	PRICE_DESC = 'price-desc',
}

export class PolicyFiltersDto {
	@IsString()
	@IsOptional()
	companyId: string;

	@IsString()
	@IsOptional()
	categorySlug: string;

	@IsEnum(PolicySort)
	@IsOptional()
	sort: PolicySort;

	@IsString()
	@IsOptional()
	search: string;
}
