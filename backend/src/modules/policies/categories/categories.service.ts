import { BadRequestException, Injectable } from '@nestjs/common';
import { isNotDeleted, PrismaService } from '@shared/prisma';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CATEGORY_NOT_FOUND_ERROR } from '@shared/errors';
import { Prisma } from 'generated/prisma';
import {
	CategoryFieldDto,
	FieldValueDto,
	OldCategoryFieldDto,
} from './dtos/category-field.dto';

@Injectable()
export class CategoriesService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		const categories = await this.prisma.policyCategory.findMany({
			where: {
				...isNotDeleted,
			},
			include: {
				policies: {
					where: {
						...isNotDeleted,
					},
					distinct: ['slug'],
				},
			},
		});

		return categories.map(({ policies, fields, ...category }) => {
			const typedFields = fields as unknown as (
				| OldCategoryFieldDto
				| CategoryFieldDto
			)[];

			const newFields = this.mapFromOldFieldDtoToNew(typedFields);

			return {
				...category,
				policiesCount: policies.length,
				fields: newFields,
			};
		});
	}

	async getById(id: string) {
		return await this.prisma.policyCategory
			.findUnique({
				where: { id, ...isNotDeleted },
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
				fields: this.mapFields(dto?.fields) as unknown as Prisma.JsonArray,
			},
		});
	}

	async delete(id: string, moveToCategoryId: string) {
		return await this.prisma.$transaction(async (tx) => {
			await tx.policyCategory.update({
				where: { id },
				data: {
					isDeleted: true,
				},
			});

			await tx.policy.updateMany({
				where: { categoryId: id },
				data: {
					categoryId: moveToCategoryId,
				},
			});
		});
	}

	async update(id: string, dto: UpdateCategoryDto) {
		return await this.prisma.policyCategory.update({
			where: { id },
			data: {
				...dto,
				fields: this.mapFields(dto?.fields) as unknown as Prisma.JsonArray,
			},
		});
	}

	async getBySlug(slug: string) {
		return await this.prisma.policyCategory.findFirst({
			where: {
				slug,
				...isNotDeleted,
			},
		});
	}

	private mapFromOldFieldDtoToNew(
		typedFields: (OldCategoryFieldDto | CategoryFieldDto)[],
	) {
		return typedFields.map((field) => {
			if ('values' in field && Array.isArray(field.values)) {
				const transformedValues = field.values.map((val) => {
					if (typeof val === 'string') {
						return { label: val, price: 0 } as FieldValueDto;
					}
					return val;
				});

				return {
					...field,
					values: transformedValues,
				};
			}
			return field;
		});
	}

	private mapFields(fields: CategoryFieldDto[]) {
		return fields.map((field) => {
			if (field.type === 'select') {
				return {
					...field,
					price: field.price ?? 0,
					values: field.values.map((value) =>
						this.parseOptionToObjectWithPrice(value),
					),
				};
			}
			return {
				...field,
				price: field.price ?? 0,
			};
		});
	}

	private parseOptionToObjectWithPrice(value: string) {
		const price = value.split('++');
		return {
			label: price[0].trim(),
			price: parseInt(price[1].trim()),
		};
	}
}
