import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { OrderFiltersDto } from './dtos/order-filters.dto';
import { PrismaService } from '@shared/prisma';
import { PdfGeneratorService } from '@shared/pdf-generator';
import { Order } from 'generated/prisma';
import { ORDER_NOT_FOUND } from '@shared/errors';
import { FORBIDDEN_GENERATE_PDF } from '@shared/errors';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PoliciesService } from '@modules/policies';

@Injectable()
export class OrdersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly pdfGenerator: PdfGeneratorService,
		private readonly policiesService: PoliciesService,
	) {}

	async getFiltered({ userId, companyId }: OrderFiltersDto) {
		return await this.prisma.order
			.findMany({
				where: {
					userId,
					policyCompanyId: companyId,
				},
			})
			.catch((error) => {
				throw new BadRequestException(ORDER_NOT_FOUND);
			});
	}

	async create(dto: CreateOrderDto) {
		const lastVersionPolicy = await this.policiesService.getLastVersion(
			dto.policySlug,
		);

		return await this.prisma.order.create({
			data: {
				policy: {
					connect: {
						id: lastVersionPolicy.id,
					},
				},
				user: {
					connect: {
						id: dto.userId,
					},
				},
			},
		});
	}

	async generatePdf(orderId: string, userId: string) {
		const order = await this.prisma.order.findUnique({
			where: { id: orderId },
		});

		if (!this.isUserOwner(userId, order)) {
			throw new ForbiddenException(FORBIDDEN_GENERATE_PDF);
		}

		return await this.pdfGenerator.generatePdf(order);
	}

	private async isUserOwner(userId: string, order: Order) {
		return order.userId === userId;
	}
}
