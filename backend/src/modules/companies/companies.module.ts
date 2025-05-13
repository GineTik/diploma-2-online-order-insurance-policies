import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaModule } from '@shared/prisma';

@Module({
	controllers: [CompaniesController],
	providers: [CompaniesService],
	imports: [PrismaModule],
	exports: [CompaniesService],
})
export class CompaniesModule {}
