import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrdersModule } from '../orders';
import { PrismaModule } from '@shared/prisma';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
	imports: [OrdersModule, PrismaModule],
})
export class UsersModule {}
