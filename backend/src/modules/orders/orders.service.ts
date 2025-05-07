import { Injectable } from '@nestjs/common';
import { OrderFiltersDto } from './dtos/order-filters.dto';

@Injectable()
export class OrdersService {
	async getFiltered(filters: OrderFiltersDto) {}
}
