import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrdersModule } from '../orders';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
	imports: [OrdersModule],
})
export class UsersModule {}
