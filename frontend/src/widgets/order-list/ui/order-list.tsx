'use client';

import { OrderCard } from './order-card';
import { useUserOrders } from '@/entities/orders/hooks/use-user-orders';
import { Loader2 } from 'lucide-react';

export const OrderList = () => {
	const { orders, isOrdersLoading } = useUserOrders();

	return (
		<div className="space-y-4">
			{isOrdersLoading && (
				<div className="flex justify-center items-center h-full">
					<Loader2 className="animate-spin" size={24} />
				</div>
			)}

			{orders?.map((order) => (
				<OrderCard key={order.id} order={order} />
			))}
		</div>
	);
};
