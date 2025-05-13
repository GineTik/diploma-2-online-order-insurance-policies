import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Auth, UserId } from '@shared/auth';
import { CreateCompanyDto } from './dtos/create-company.dto';

@Controller('companies')
export class CompaniesController {
	constructor(private readonly companiesService: CompaniesService) {}

	@Get()
	async getAll() {
		return await this.companiesService.getAll();
	}

	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.companiesService.getOne(id);
	}

	@Post()
	@Auth()
	async create(@Body() body: CreateCompanyDto, @UserId() userId: string) {
		return await this.companiesService.create(userId, body);
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @UserId() userId: string) {
		return await this.companiesService.delete(id, userId);
	}
}
