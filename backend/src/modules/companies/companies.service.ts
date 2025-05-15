import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { PrismaService } from '@shared/prisma';
import {
	USER_NOT_FOUND,
	USER_ALREADY_HAVE_COMPANY,
	COMPANY_NOT_FOUND_BY_ADMIN_ID,
} from '@shared/errors';
import { CompanyFiltersDto } from './dtos/company-filters.dto';

@Injectable()
export class CompaniesService {
	constructor(private readonly prisma: PrismaService) {}

	async getFiltered({ search }: CompanyFiltersDto) {
		const companies = await this.prisma.company.findMany({
			where: {
				name: {
					contains: search,
					mode: 'insensitive',
				},
			},
			include: {
				policies: {
					where: {
						OR: [{ isDeleted: false }, { isDeleted: { isSet: false } }],
					},
					orderBy: { version: 'desc' },
					distinct: ['slug'],
				},
			},
		});

		return companies.map((company) => ({
			...company,
			policiesCount: company.policies.length,
		}));
	}

	async getOne(id: string) {
		const { users, ...company } = await this.prisma.company.findUnique({
			where: { id },
			include: {
				users: {
					include: {
						user: true,
					},
					where: {
						isAdmin: true,
					},
				},
			},
		});

		return {
			...company,
			admin: users[0].user,
		};
	}

	async getByAdminSub(sub: string) {
		const userCompany = await this.prisma.userCompany.findFirst({
			where: {
				user: {
					sub,
				},
				isAdmin: true,
			},
			include: {
				company: true,
				user: true,
			},
		});

		if (!userCompany)
			throw new BadRequestException(COMPANY_NOT_FOUND_BY_ADMIN_ID(sub));

		return userCompany?.company;
	}

	async create(clerkId: string, body: CreateCompanyDto) {
		const user = await this.prisma.user.findFirst({
			where: {
				sub: clerkId,
			},
		});

		if (!user) {
			throw new BadRequestException(USER_NOT_FOUND(clerkId));
		}
		if (await this.isUserHaveCompany(user.id)) {
			throw new BadRequestException(USER_ALREADY_HAVE_COMPANY);
		}

		const company = await this.prisma.company.create({
			data: {
				name: body.name,
			},
		});

		await this.prisma.userCompany.create({
			data: {
				userId: user.id,
				companyId: company.id,
				isAdmin: true,
			},
		});

		return company;
	}

	async delete(companyId: string, userId: string) {
		if (!(await this.userIsCompanyAdmin(userId, companyId))) {
			throw new BadRequestException(USER_NOT_FOUND(userId));
		}

		return await this.prisma.company.delete({
			where: {
				id: companyId,
			},
		});
	}

	private async isUserExists(userId: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				sub: userId,
			},
		});

		return !!user;
	}

	private async isUserHaveCompany(userId: string) {
		const user = await this.prisma.userCompany.findFirst({
			where: {
				userId,
				isAdmin: true,
			},
		});

		return !!user;
	}

	private async userIsCompanyAdmin(userId: string, companyId: string) {
		const userCompany = await this.prisma.userCompany.findFirst({
			where: {
				userId,
				companyId,
				isAdmin: true,
			},
		});

		return !!userCompany;
	}
}
