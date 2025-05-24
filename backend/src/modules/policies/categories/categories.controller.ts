import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Auth, Permission } from '@shared/auth';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { PERMISSIONS } from '@shared/auth';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	async getAll() {
		return await this.categoriesService.getAll();
	}

	@Post()
	@Auth()
	@Permission(PERMISSIONS.MANAGE_POLICY_CATEGORY)
	async create(@Body() dto: CreateCategoryDto) {
		return await this.categoriesService.create(dto);
	}

	@Delete(':id')
	@Auth()
	@Permission(PERMISSIONS.MANAGE_POLICY_CATEGORY)
	async delete(@Param('id') id: string) {
		return await this.categoriesService.delete(id);
	}

	@Put(':id')
	@Auth()
	@Permission(PERMISSIONS.MANAGE_POLICY_CATEGORY)
	async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
		return await this.categoriesService.update(id, dto);
	}
}
