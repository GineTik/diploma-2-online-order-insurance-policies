import { BadRequestException, Injectable } from '@nestjs/common';
import { PolicyFiltersDto } from './dtos/policy-filters.dto';
import { PrismaService } from '@shared/prisma';

@Injectable()
export class PoliciesService {
	constructor(private readonly prisma: PrismaService) {}

	async getFiltered({ companyId }: PolicyFiltersDto) {
		return await this.prisma.policy
			.findMany({
				where: { companyId },
			})
			.catch((err) => {
				throw new BadRequestException(`Company not found by ${companyId}`);
			});
	}
}
