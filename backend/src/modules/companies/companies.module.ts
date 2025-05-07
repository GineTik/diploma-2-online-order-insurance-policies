import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PoliciesService } from '@modules/policies';
import { PrismaModule } from '@shared/prisma';

@Module({
	controllers: [CompaniesController],
	providers: [CompaniesService, PoliciesService],
	imports: [PrismaModule],
})
export class CompaniesModule {}
