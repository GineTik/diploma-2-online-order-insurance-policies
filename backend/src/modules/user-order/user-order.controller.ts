import { Controller, Get } from '@nestjs/common';
import { OrdersService } from '@modules/orders';
import { UserSub, Auth } from '@shared/auth';

@Controller()
export class UserOrderController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get('users/orders')
	@Auth()
	async getUserOrders(@UserSub() userId: string) {
		return await this.ordersService.getFiltered({ userId });
	}
}
