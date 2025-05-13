import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Auth, UserId } from '@shared/auth';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { PoliciesService } from '@modules/policies';
import { OrdersService } from '@modules/orders';

@Controller('companies')
export class CompaniesController {
	constructor(
		private readonly companiesService: CompaniesService,
		private readonly policiesService: PoliciesService,
		private readonly ordersService: OrdersService,
	) {}

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

	@Get(':id/policies')
	async getPolicies(@Param('id') id: string) {
		return await this.policiesService.getFiltered({ companyId: id });
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @UserId() userId: string) {
		return await this.companiesService.delete(id, userId);
	}

	@Get(':id/orders')
	async getOrders(@Param('id') id: string) {
		return await this.ordersService.getFiltered({ companyId: id });
	}
}
