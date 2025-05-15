import { IsOptional } from 'class-validator';

import { IsString } from 'class-validator';

export class CompanyFiltersDto {
	@IsOptional()
	@IsString()
	search?: string;
}
