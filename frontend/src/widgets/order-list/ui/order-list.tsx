'use client';

import { OrderCard } from './order-card';
import { OrderFilters, useOrders } from '@/entities/orders';
import { Loader2 } from 'lucide-react';

type OrderListProps = {
	filters?: OrderFilters;
	companyView?: boolean;
};

export const OrderList = ({ filters, companyView }: OrderListProps) => {
	const { orders, isOrdersLoading } = useOrders(filters);

	return (
		<div className="space-y-4">
			{isOrdersLoading && (
				<div className="flex justify-center items-center h-full">
					<Loader2 className="animate-spin" size={24} />
				</div>
			)}

			{orders?.map((order) => (
				<OrderCard key={order.id} order={order} companyView={companyView} />
			))}
		</div>
	);
};
