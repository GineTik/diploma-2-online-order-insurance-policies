import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CATEGORY_NOT_FOUND_ERROR } from '@shared/errors';

@Injectable()
export class CategoriesService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.policyCategory.findMany();
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
		return await this.prisma.policyCategory.create({
			data: {
				...dto,
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
			},
		});
	}
}
