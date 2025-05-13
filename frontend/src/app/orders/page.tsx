import { H2 } from '@/shared/ui/headings';
import { OrderList } from '@/widgets/order-list';

export default function OrdersPage() {
	return (
		<div className="max-w-[800px] mx-auto w-full space-y-4">
			<H2>Ваші замовлення</H2>
			<OrderList />
		</div>
	);
}
