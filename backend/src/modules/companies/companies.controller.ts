import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Auth, UserId } from '@shared/auth';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { PoliciesService } from '@modules/policies';

@Controller('companies')
export class CompaniesController {
	constructor(
		private readonly companiesService: CompaniesService,
		private readonly policiesService: PoliciesService,
	) {}

	@Get()
	async getAll() {
		return await this.companiesService.getAll();
	}

	@Post()
	@Auth()
	async create(@Body() body: CreateCompanyDto, @UserId() userId: string) {
		return await this.companiesService.create(userId, body);
	}

	@Get(':id/policies')
	async getPolicies(@Param('id') id: string) {
		return await this.policiesService.getFiltered({ companyId: id });
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @UserId() userId: string) {
		return await this.companiesService.delete(id, userId);
	}
}
