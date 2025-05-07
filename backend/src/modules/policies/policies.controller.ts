import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PoliciesService } from './policies.service';

@Controller('policies')
export class PoliciesController {
	constructor(private readonly policiesService: PoliciesService) {}

	@Get()
	async getFiltered(@Query('companyId') companyId: string) {
		return await this.policiesService.getFiltered({ companyId });
	}

	@Get(':slug')
	async getBySlug(@Param('slug') slug: string) {
		return await this.policiesService.getLastVersion(slug);
	}

	@Get(':slug/category')
	async getCategory(@Param('slug') slug: string) {
		return await this.policiesService.getCategory(slug);
	}

	@Post(':slug/order')
	async order() {}

	@Delete(':slug')
	async delete() {}
}
