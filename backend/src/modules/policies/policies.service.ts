import { BadRequestException, Injectable } from '@nestjs/common';
import { PolicyFiltersDto } from './dtos/policy-filters.dto';
import { PrismaService } from '@shared/prisma';
import {
	COMPANY_NOT_FOUND_ERROR,
	POLICY_NOT_FOUND_ERROR,
} from '@shared/errors';

@Injectable()
export class PoliciesService {
	constructor(private readonly prisma: PrismaService) {}

	async getFiltered({ companyId }: PolicyFiltersDto) {
		return await this.prisma.policy
			.findMany({
				where: { companyId },
			})
			.catch((err) => {
				throw new BadRequestException(COMPANY_NOT_FOUND_ERROR(companyId));
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
}
