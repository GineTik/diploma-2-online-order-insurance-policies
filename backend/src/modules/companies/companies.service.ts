import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { PrismaService } from '@shared/prisma';
import { USER_NOT_FOUND } from '@modules/users';
import { USER_ALREADY_HAVE_COMPANY } from './constants/errors.constants';

@Injectable()
export class CompaniesService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.userCompany.findMany();
	}

	async create(userId: string, body: CreateCompanyDto) {
		if (!(await this.isUserExists(userId))) {
			throw new BadRequestException(USER_NOT_FOUND);
		}

		if (await this.isUserHaveCompany(userId)) {
			throw new BadRequestException(USER_ALREADY_HAVE_COMPANY);
		}

		const company = await this.prisma.company.create({
			data: {
				name: body.name,
			},
		});

		return company;
	}

	async delete(companyId: string, userId: string) {
		if (!(await this.userIsCompanyAdmin(userId, companyId))) {
			throw new BadRequestException(USER_NOT_FOUND);
		}

		return await this.prisma.company.delete({
			where: {
				id: companyId,
			},
		});
	}

	private async isUserExists(userId: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
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
