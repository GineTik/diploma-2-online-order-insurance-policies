import { Controller, Delete, Get, Post } from '@nestjs/common';
import { PoliciesService } from './policies.service';

@Controller('policies')
export class PoliciesController {
	constructor(private readonly policiesService: PoliciesService) {}

	@Get()
	async getAll() {}

	@Get(':slug')
	async getBySlug() {}

	@Get(':slug/categories')
	async getCategories() {}

	@Post(':slug/order')
	async order() {}

	@Delete(':slug')
	async delete() {}
}
