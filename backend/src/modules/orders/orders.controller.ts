import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Res,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Auth } from '@shared/auth';
import { UserSub } from '@shared/auth';
import { Response } from 'express';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderFiltersDto } from './dtos/order-filters.dto';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	@Auth()
	async create(@Body() dto: CreateOrderDto, @UserSub() userId: string) {
		return await this.ordersService.create(dto, userId);
	}

	@Get(':id/generate/pdf')
	@Auth()
	async generatePDF(
		@Res({ passthrough: true }) res: Response,
		@Param('id') id: string,
		@UserSub() userId: string,
	) {
		const pdf = await this.ordersService.generatePdf(id, userId);

		res.set({
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment; filename=orders.pdf',
			'Content-Length': pdf.length,
		});

		res.end(pdf);
	}

	@Get()
	@Auth()
	async getOrders(@Query() filters: OrderFiltersDto) {
		return await this.ordersService.getFiltered(filters);
	}

	@Patch(':id/approve')
	@Auth()
	async approveOrder(@Param('id') id: string, @UserSub() userSub: string) {
		return await this.ordersService.approveOrder(id, userSub);
	}

	@Patch(':id/cancel')
	@Auth()
	async cancelOrder(@Param('id') id: string, @UserSub() userSub: string) {
		return await this.ordersService.cancelOrder(id, userSub);
	}
}
