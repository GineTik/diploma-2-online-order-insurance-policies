import { Controller, Get } from '@nestjs/common';
import { Auth, UserId } from '@shared/auth';
import { OrdersService } from '@modules/orders';

@Controller('users')
export class UsersController {
	constructor(private ordersService: OrdersService) {}

	@Get('my-orders')
	@Auth()
	async getOrders(@UserId() userId: string) {
		return await this.ordersService.getFiltered({
			userId,
		});
	}
}
