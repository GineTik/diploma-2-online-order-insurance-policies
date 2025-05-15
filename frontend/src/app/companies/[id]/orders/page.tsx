'use client';

import { H2 } from '@/shared/ui/headings';
import { OrderList } from '@/widgets/order-list';
import { useParams } from 'next/navigation';

export default function CompanyOrdersPage() {
	const params = useParams<{ id: string }>();

	return (
		<div className="max-w-[800px] mx-auto w-full space-y-4">
			<H2>Замовлення компанії</H2>
			<OrderList filters={{ companyId: params.id }} companyView />
		</div>
	);
}
