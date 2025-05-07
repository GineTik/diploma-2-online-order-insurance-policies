import { Controller, Get, Param } from '@nestjs/common';
import { Auth, PERMISSIONS, UserId } from '@shared/auth';
import { OrdersService } from '@modules/orders';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(
		private ordersService: OrdersService,
		private usersService: UsersService,
	) {}

	@Get('my-orders')
	@Auth()
	async getOrders(@UserId() userId: string) {
		return await this.ordersService.getFiltered({
			userId,
		});
	}

	@Get('permissions')
	async getAllPermissions() {
		return Object.values(PERMISSIONS);
	}

	@Get(':userId/permissions')
	async getUserPermissions(@Param('userId') userId: string) {
		return await this.usersService.getUserPermissions(userId);
	}
}
