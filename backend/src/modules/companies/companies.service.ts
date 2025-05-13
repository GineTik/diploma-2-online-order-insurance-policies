import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { PrismaService } from '@shared/prisma';
import {
	USER_NOT_FOUND,
	USER_ALREADY_HAVE_COMPANY,
	COMPANY_NOT_FOUND_BY_ADMIN_ID,
} from '@shared/errors';

@Injectable()
export class CompaniesService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.company.findMany();
	}

	async getOne(id: string) {
		return await this.prisma.company.findUnique({
			where: { id },
		});
	}

	async getByAdminId(clerkId: string) {
		const userCompany = await this.prisma.userCompany.findFirst({
			where: {
				user: {
					sub: clerkId,
				},
				isAdmin: true,
			},
			include: {
				company: true,
			},
		});

		if (!userCompany)
			throw new BadRequestException(COMPANY_NOT_FOUND_BY_ADMIN_ID(clerkId));

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
