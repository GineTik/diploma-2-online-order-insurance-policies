import { OrderCard } from '@/entities/orders';

export const OrderList = () => {
	return (
		<div className="space-y-4">
			<OrderCard />
			<OrderCard />
			<OrderCard />
		</div>
	);
};
