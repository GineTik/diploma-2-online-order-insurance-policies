import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { PrismaService } from '@shared/prisma';
import {
	USER_NOT_FOUND_BY_ID,
	USER_ALREADY_HAVE_COMPANY,
	COMPANY_NOT_FOUND_BY_ADMIN_ID,
	USER_NOT_FOUND,
} from '@shared/errors';
import { CompanyFiltersDto } from './dtos/company-filters.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

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
				OR: [{ isDeleted: false }, { isDeleted: { isSet: false } }],
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
		const companyData = await this.prisma.company.findUnique({
			where: {
				id,
				OR: [{ isDeleted: false }, { isDeleted: { isSet: false } }],
			},
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

		if (!companyData) {
			throw new NotFoundException(
				`Company with ID ${id} not found or has been deleted.`,
			);
		}

		const { users, ...companyDetails } = companyData;

		if (!users || users.length === 0 || !users[0]?.user) {
			throw new NotFoundException(
				`Admin user not found for company with ID ${id}.`,
			);
		}

		return {
			...companyDetails,
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
				company: {
					OR: [{ isDeleted: false }, { isDeleted: { isSet: false } }],
				},
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
			throw new BadRequestException(USER_NOT_FOUND_BY_ID(clerkId));
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

	async delete(companyId: string, userSub: string) {
		if (!(await this.userIsCompanyAdminByUserSub(userSub, companyId))) {
			throw new BadRequestException(USER_NOT_FOUND);
		}

		return await this.prisma.$transaction(async (tx) => {
			await tx.policy.updateMany({
				where: {
					companyId,
				},
				data: {
					isDeleted: true,
				},
			});

			return await tx.company.update({
				where: {
					id: companyId,
				},
				data: {
					isDeleted: true,
				},
			});
		});
	}

	async update(companyId: string, body: UpdateCompanyDto, userSub: string) {
		if (!(await this.userIsCompanyAdminByUserSub(userSub, companyId))) {
			throw new BadRequestException(USER_NOT_FOUND);
		}

		return await this.prisma.company.update({
			where: { id: companyId },
			data: body,
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
				company: {
					OR: [{ isDeleted: false }, { isDeleted: { isSet: false } }],
				},
			},
		});

		return !!user;
	}

	private async userIsCompanyAdminByUserSub(
		userSub: string,
		companyId: string,
	) {
		const userCompany = await this.prisma.userCompany.findFirst({
			where: {
				user: {
					sub: userSub,
				},
				companyId,
				isAdmin: true,
			},
		});

		return !!userCompany;
	}
}
