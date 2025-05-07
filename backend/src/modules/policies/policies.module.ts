import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { PrismaModule } from '@shared/prisma';
import { CategoriesModule } from './categories';

@Module({
	controllers: [PoliciesController],
	providers: [PoliciesService],
	imports: [PrismaModule, CategoriesModule],
	exports: [PoliciesService],
})
export class PoliciesModule {}
