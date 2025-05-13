import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { PrismaModule } from '@shared/prisma';
import { CategoriesModule } from './categories';
import { CompaniesModule } from '@modules/companies';

@Module({
	controllers: [PoliciesController],
	providers: [PoliciesService],
	imports: [PrismaModule, CategoriesModule, CompaniesModule],
	exports: [PoliciesService],
})
export class PoliciesModule {}
