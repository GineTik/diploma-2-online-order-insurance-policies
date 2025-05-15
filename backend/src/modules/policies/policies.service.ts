import { BadRequestException, Injectable } from '@nestjs/common';
import { PolicyFiltersDto, PolicySort } from './dtos/policy-filters.dto';
import { PrismaService } from '@shared/prisma';
import {
	POLICY_ALREADY_EXISTS,
	POLICY_NOT_FOUND_ERROR,
	USER_HAS_NO_COMPANY,
	USER_IS_NOT_POLICY_OWNER,
} from '@shared/errors';
import { CategoriesService } from './categories';
import { CreatePolicyDto } from './dtos/create-policy.dto';
import { CompaniesService } from '@modules/companies';
import { Policy, Prisma } from 'generated/prisma';

const mapPolicySortToString = (sort: PolicySort) => {
	switch (sort) {
		case PolicySort.PRICE_ASC:
			return 'asc';
		case PolicySort.PRICE_DESC:
			return 'desc';
		default:
			return undefined;
	}
};

@Injectable()
export class PoliciesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly categoriesService: CategoriesService,
		private readonly companyService: CompaniesService,
	) {}

	async getFiltered({
		companyId,
		categorySlug,
		sort,
		search,
	}: PolicyFiltersDto) {
		return await this.prisma.policy
			.findMany({
				where: {
					companyId,
					category: {
						slug: categorySlug,
					},
					name: {
						contains: search,
						mode: 'insensitive',
					},
					OR: [{ isDeleted: false }, { isDeleted: { isSet: false } }],
				},
				orderBy: [
					{
						price: mapPolicySortToString(sort),
					},
					{
						version: 'desc',
					},
				],
				distinct: ['slug'],
				include: {
					category: true,
				},
			})
			.catch((err) => {
				return [];
			});
	}

	async getLastVersion(slug: string) {
		return await this.prisma.policy
			.findFirst({
				where: {
					slug,
					OR: [{ isDeleted: false }, { isDeleted: { isSet: false } }],
				},
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

		const company = await this.companyService.getByAdminSub(userId);
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

	async update(dto: CreatePolicyDto, userId: string, oldSlug: string) {
		const policies = await this.getAllVersionsBySlug(oldSlug);
		if (policies.length === 0) {
			throw new BadRequestException(POLICY_NOT_FOUND_ERROR(dto.slug));
		}

		const lastVersion = policies.sort((a, b) => b.version - a.version)[0];

		if (!(await this.userIsPolicyOwner(userId, lastVersion))) {
			throw new BadRequestException(USER_IS_NOT_POLICY_OWNER(userId));
		}

		if (oldSlug !== dto.slug) {
			await this.prisma.policy.updateMany({
				where: { slug: oldSlug },
				data: { slug: dto.slug },
			});
		}

		await this.prisma.policy.create({
			data: {
				...dto,
				version: lastVersion.version + 1,
				companyId: lastVersion.companyId,
			},
		});
	}

	async getAllVersionsBySlug(slug: string) {
		return await this.prisma.policy.findMany({
			where: { slug },
			orderBy: { version: 'desc' },
		});
	}

	async delete(slug: string) {
		return await this.prisma.policy.updateMany({
			where: { slug },
			data: { isDeleted: true, deletedAt: new Date() },
		});
	}

	private async userIsPolicyOwner(userId: string, policy: Policy) {
		const company = await this.companyService.getByAdminSub(userId);
		return company?.id === policy.companyId;
	}
}
