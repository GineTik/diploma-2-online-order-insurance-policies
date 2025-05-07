import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from '@shared/prisma';

@Module({
	controllers: [PoliciesController],
	providers: [PoliciesService],
	imports: [CategoriesModule, PrismaModule],
	exports: [PoliciesService],
})
export class PoliciesModule {}
