import { Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	async create() {}

	@Get(':id/generate/pdf')
	async generatePDF() {}
}
