import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Auth } from '@shared/auth';
import { UserId } from '@shared/auth';
import { Response } from 'express';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	async create(@Body() dto: CreateOrderDto) {
		return await this.ordersService.create(dto);
	}

	@Get(':id/generate/pdf')
	@Auth()
	async generatePDF(
		@Res({ passthrough: true }) res: Response,
		@Param('id') id: string,
		@UserId() userId: string,
	) {
		const pdf = await this.ordersService.generatePdf(id, userId);

		res.set({
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment; filename=orders.pdf',
			'Content-Length': pdf.length,
		});

		res.end(pdf);
	}
}
