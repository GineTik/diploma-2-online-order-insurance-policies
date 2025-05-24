import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CATEGORY_NOT_FOUND_ERROR } from '@shared/errors';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CategoriesService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		const categories = await this.prisma.policyCategory.findMany({
			include: {
				policies: {
					where: {
						OR: [{ isDeleted: false }, { isDeleted: { isSet: false } }],
					},
					distinct: ['slug'],
				},
			},
		});

		return categories.map(({ policies, ...category }) => ({
			...category,
			policiesCount: policies.length,
		}));
	}

	async getById(id: string) {
		return await this.prisma.policyCategory
			.findUnique({
				where: { id },
			})
			.catch((err) => {
				throw new BadRequestException(CATEGORY_NOT_FOUND_ERROR(id));
			});
	}

	async create(dto: CreateCategoryDto) {
		const category = await this.getBySlug(dto.slug);

		if (category) {
			throw new BadRequestException('Category with currentslug already exists');
		}

		return await this.prisma.policyCategory.create({
			data: {
				...dto,
				fields: dto?.fields as unknown as Prisma.JsonArray,
			},
		});
	}

	async delete(id: string) {
		return await this.prisma.policyCategory.delete({
			where: { id },
		});
	}

	async update(id: string, dto: UpdateCategoryDto) {
		return await this.prisma.policyCategory.update({
			where: { id },
			data: {
				...dto,
				fields: dto?.fields as unknown as Prisma.JsonArray,
			},
		});
	}

	async getBySlug(slug: string) {
		return await this.prisma.policyCategory.findFirst({
			where: {
				slug,
			},
		});
	}
}
