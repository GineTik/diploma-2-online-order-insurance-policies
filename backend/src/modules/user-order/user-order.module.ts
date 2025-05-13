import { Module } from '@nestjs/common';
import { UserOrderController } from './user-order.controller';
import { PrismaModule } from '@shared/prisma';
import { OrdersModule } from '@modules/orders';

@Module({
	controllers: [UserOrderController],
	imports: [PrismaModule, OrdersModule],
})
export class UserOrderModule {}
