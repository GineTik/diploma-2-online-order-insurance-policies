import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dtos/create-policy.dto';
import { Auth, UserSub } from '@shared/auth';
import { PolicySort } from './dtos/policy-filters.dto';
import { publicDecrypt } from 'crypto';
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

	@Get(':slug/versions')
	async getVersions(@Param('slug') slug: string) {
		return await this.policiesService.getAllVersionsBySlug(slug);
	}

	@Post()
	@Auth()
	async create(@Body() body: CreatePolicyDto, @UserSub() userId: string) {
		return await this.policiesService.create(body, userId);
	}

	@Put(':slug')
	@Auth()
	async update(
		@Body() body: CreatePolicyDto,
		@Param('slug') slug: string,
		@UserSub() userId: string,
	) {
		return await this.policiesService.update(body, userId, slug);
	}

	@Delete(':slug')
	async delete(@Param('slug') slug: string) {
		return await this.policiesService.delete(slug);
	}
}
