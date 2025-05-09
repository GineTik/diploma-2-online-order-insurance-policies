import { OrderItem } from '@/entities/orders';

export const OrderList = () => {
	return (
		<div className="space-y-4">
			<OrderItem />
			<OrderItem />
			<OrderItem />
		</div>
	);
};
