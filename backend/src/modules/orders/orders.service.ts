import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { OrderFiltersDto } from './dtos/order-filters.dto';
import { PrismaService } from '@shared/prisma';
import { PdfGeneratorService } from '@shared/pdf-generator';
import { Order } from 'generated/prisma';
import { ORDER_NOT_FOUND, USER_NOT_FOUND } from '@shared/errors';
import { FORBIDDEN_GENERATE_PDF } from '@shared/errors';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PoliciesService } from '@modules/policies';
import { UsersService } from '@modules/users';
@Injectable()
export class OrdersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly pdfGenerator: PdfGeneratorService,
		private readonly policiesService: PoliciesService,
		private readonly usersService: UsersService,
	) {}

	async getFiltered({ userId, companyId }: OrderFiltersDto) {
		const user = await this.usersService.getBySub(userId);
		if (!user) {
			throw new BadRequestException(USER_NOT_FOUND);
		}

		return await this.prisma.order
			.findMany({
				where: {
					userId: user.id,
					policyCompanyId: companyId,
				},
				include: {
					policy: {
						include: {
							company: true,
						},
					},
				},
			})
			.catch(() => {
				return [];
			});
	}

	async create(dto: CreateOrderDto, userSub: string) {
		const lastVersionPolicy = await this.policiesService.getLastVersion(
			dto.policySlug,
		);

		const user = await this.usersService.getBySub(userSub);
		if (!user) {
			throw new BadRequestException(USER_NOT_FOUND);
		}

		return await this.prisma.order.create({
			data: {
				policy: {
					connect: {
						id: lastVersionPolicy.id,
					},
				},
				user: {
					connect: {
						id: user.id,
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
