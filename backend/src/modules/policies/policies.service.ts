import { BadRequestException, Injectable } from '@nestjs/common';
import { PolicyFiltersDto } from './dtos/policy-filters.dto';
import { PrismaService } from '@shared/prisma';
import {
	COMPANY_NOT_FOUND,
	POLICY_ALREADY_EXISTS,
	POLICY_NOT_FOUND_ERROR,
	USER_HAS_NO_COMPANY,
} from '@shared/errors';
import { CategoriesService } from './categories';
import { CreatePolicyDto } from './dtos/create-policy.dto';
import { CompaniesService } from '@modules/companies';

@Injectable()
export class PoliciesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly categoriesService: CategoriesService,
		private readonly companyService: CompaniesService,
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

	async create(dto: CreatePolicyDto, userId: string) {
		const policy = await this.getLastVersion(dto.slug);
		if (policy !== null) {
			throw new BadRequestException(POLICY_ALREADY_EXISTS(dto.slug));
		}

		const company = await this.companyService.getByAdminId(userId);
		if (company === null) {
			throw new BadRequestException(USER_HAS_NO_COMPANY(userId));
		}

		return await this.prisma.policy.create({
			data: {
				name: dto.name,
				slug: dto.slug,
				description: dto.description,
				price: dto.price,
				version: 0,
				options: [],
				company: {
					connect: {
						id: company.id,
					},
				},
				category: {
					connect: {
						id: dto.categoryId,
					},
				},
			},
		});
	}
}
