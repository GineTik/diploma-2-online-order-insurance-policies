import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dtos/create-policy.dto';
import { Auth, UserId } from '@shared/auth';
import { PolicySort } from './dtos/policy-filters.dto';
@Controller('policies')
export class PoliciesController {
	constructor(private readonly policiesService: PoliciesService) {}

	@Get()
	async getFiltered(
		@Query('companyId') companyId: string,
		@Query('categorySlug') categorySlug: string,
		@Query('sort') sort: PolicySort,
		@Query('search') search: string,
	) {
		return await this.policiesService.getFiltered({
			companyId,
			categorySlug,
			sort,
			search,
		});
	}

	@Get(':slug')
	async getBySlug(@Param('slug') slug: string) {
		return await this.policiesService.getLastVersion(slug);
	}

	@Get(':slug/category')
	async getCategory(@Param('slug') slug: string) {
		return await this.policiesService.getCategory(slug);
	}

	@Post()
	@Auth()
	async create(@Body() body: CreatePolicyDto, @UserId() userId: string) {
		return await this.policiesService.create(body, userId);
	}

	@Post(':slug/order')
	async order() {}

	@Delete(':slug')
	async delete() {}
}
