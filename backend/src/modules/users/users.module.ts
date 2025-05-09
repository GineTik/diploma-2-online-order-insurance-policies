import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrdersModule } from '../orders';
import { PrismaModule } from '@shared/prisma';
import { CompaniesModule } from '../companies';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
	imports: [OrdersModule, PrismaModule, CompaniesModule],
})
export class UsersModule {}
