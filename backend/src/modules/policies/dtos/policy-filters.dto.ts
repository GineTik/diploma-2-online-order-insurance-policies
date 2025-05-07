import { IsOptional, IsString } from 'class-validator';

export class PolicyFiltersDto {
	@IsString()
	@IsOptional()
	companyId: string;
}
