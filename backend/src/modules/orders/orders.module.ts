import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '@shared/prisma';
import { PdfGeneratorModule } from '@shared/pdf-generator';
import { PoliciesModule } from '@modules/policies';
import { UsersModule } from '@modules/users';

@Module({
	controllers: [OrdersController],
	providers: [OrdersService],
	exports: [OrdersService],
	imports: [PrismaModule, PdfGeneratorModule, PoliciesModule, UsersModule],
})
export class OrdersModule {}
