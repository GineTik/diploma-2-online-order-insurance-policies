import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderFiltersDto } from './dtos/order-filters.dto';
import { PrismaService } from '@shared/prisma';
import { PdfGeneratorService } from '@shared/pdf-generator';
import { Order, OrderStatus } from 'generated/prisma';
import { USER_IS_NOT_POLICY_OWNER, USER_NOT_FOUND_BY_ID } from '@shared/errors';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PoliciesService } from '@modules/policies';
import { UsersService } from '@modules/users';
import { Response } from 'express';

@Injectable()
export class OrdersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly pdfGenerator: PdfGeneratorService,
		private readonly policiesService: PoliciesService,
		private readonly usersService: UsersService,
	) {}

	async getFiltered({ userId, companyId }: OrderFiltersDto) {
		return await this.prisma.order
			.findMany({
				where: {
					user: {
						sub: userId,
					},
					policyCompanyId: companyId,
				},
				include: {
					policy: {
						include: {
							company: true,
						},
					},
					informations: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			})
			.catch(() => {
				return [];
			});
	}

	async approveOrder(orderId: string, userId: string) {
		await this.throwIfUserHaveNotPermission(userId, orderId);

		return await this.prisma.order.update({
			where: { id: orderId },
			data: { status: OrderStatus.COMPLETED },
		});
	}

	async cancelOrder(orderId: string, userId: string) {
		await this.throwIfUserHaveNotPermission(userId, orderId);

		return await this.prisma.order.update({
			where: { id: orderId },
			data: { status: OrderStatus.CANCELLED },
		});
	}

	async create(dto: CreateOrderDto, userSub: string) {
		const lastVersionPolicy = await this.policiesService.getLastVersion(
			dto.policySlug,
		);

		const user = await this.usersService.getBySub(userSub);
		if (!user) {
			throw new BadRequestException(USER_NOT_FOUND_BY_ID);
		}

		return await this.prisma.order.create({
			data: {
				informations: {
					create: dto.informations,
				},
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

	async generatePdf(orderId: string, res: Response) {
		const { id, userId, createdAt, updatedAt, ...order } =
			await this.prisma.order.findUnique({
				where: { id: orderId },
				include: {
					policy: {
						include: {
							company: true,
						},
					},
					informations: true,
				},
			});

		return await this.pdfGenerator.generatePdf(
			`order-#${id}`,
			{
				header: {
					id,
					status: order.status,
					orderedDate: createdAt.toISOString(),
				},
				policyDetails: {
					sectionTitle: 'Поліс',
					title: order.policy.name,
					version: order.policy.version.toString(),
					description: order.policy.description,
					advantages: order.policy.options ?? [],
				},
				orderSummary: {
					sectionTitle: 'Деталі замовлення',
					details: order.informations.map((i) => ({
						label: i.key,
						value:
							typeof i.value === 'string'
								? i.value
								: typeof i.value === 'boolean'
									? 'Так'
									: 'Ні',
					})),
				},
				footer: {
					orderTotal: order.policy.price.toString(),
					companyName: order.policy.company.name,
				},
			},
			res,
		);
	}

	private async isUserOwner(userId: string, order: Order) {
		return order.userId === userId;
	}

	private async throwIfUserHaveNotPermission(userSub: string, orderId: string) {
		const order = await this.prisma.order.findUnique({
			where: { id: orderId },
		});

		const userCompany = await this.prisma.userCompany.findFirst({
			where: {
				user: {
					sub: userSub,
				},
				company: {
					id: order.policyCompanyId,
				},
				isAdmin: true,
			},
		});

		if (!userCompany) {
			throw new BadRequestException(USER_IS_NOT_POLICY_OWNER(userSub));
		}
	}
}
