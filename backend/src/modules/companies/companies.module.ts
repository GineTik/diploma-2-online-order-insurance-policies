import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaModule } from '@shared/prisma';
import { OrdersModule } from '@modules/orders';
import { PoliciesModule } from '@modules/policies';

@Module({
	controllers: [CompaniesController],
	providers: [CompaniesService],
	imports: [PrismaModule, OrdersModule, PoliciesModule],
	exports: [CompaniesService],
})
export class CompaniesModule {}
