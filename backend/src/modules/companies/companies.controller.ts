import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Auth, UserSub } from '@shared/auth';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { CompanyFiltersDto } from './dtos/company-filters.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

@Controller('companies')
export class CompaniesController {
	constructor(private readonly companiesService: CompaniesService) {}

	@Get()
	async getFiltered(@Query() filters: CompanyFiltersDto) {
		return await this.companiesService.getFiltered(filters);
	}

	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.companiesService.getOne(id);
	}

	@Post()
	@Auth()
	async create(@Body() body: CreateCompanyDto, @UserSub() userId: string) {
		return await this.companiesService.create(userId, body);
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @UserSub() userSub: string) {
		return await this.companiesService.delete(id, userSub);
	}

	@Put(':id')
	@Auth()
	async update(
		@Param('id') id: string,
		@Body() body: UpdateCompanyDto,
		@UserSub() userSub: string,
	) {
		return await this.companiesService.update(id, body, userSub);
	}
}
