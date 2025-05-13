import { BadRequestException, Injectable } from '@nestjs/common';
import { PolicyFiltersDto } from './dtos/policy-filters.dto';
import { PrismaService } from '@shared/prisma';
import { COMPANY_NOT_FOUND, POLICY_NOT_FOUND_ERROR } from '@shared/errors';
import { CategoriesService } from './categories';

@Injectable()
export class PoliciesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly categoriesService: CategoriesService,
	) {}

	async getFiltered({ companyId }: PolicyFiltersDto) {
		return await this.prisma.policy
			.findMany({
				where: { companyId },
			})
			.catch((err) => {
				throw new BadRequestException(COMPANY_NOT_FOUND(companyId));
			});
	}

	async getLastVersion(slug: string) {
		return await this.prisma.policy
			.findFirst({
				where: { slug },
				orderBy: { version: 'desc' },
			})
			.catch((err) => {
				throw new BadRequestException(POLICY_NOT_FOUND_ERROR(slug));
			});
	}

	async getCategory(slug: string) {
		const policy = await this.getLastVersion(slug);
		return await this.categoriesService.getById(policy.categoryId);
	}
}
