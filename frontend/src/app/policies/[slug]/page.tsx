'use client';

import { usePolicy } from '@/entities/policies';
import { useParams } from 'next/navigation';
import { H2 } from '@/shared/ui/headings';
import { OrderForm } from '@/widgets/policies';
import { Loader2 } from 'lucide-react';

export default function PolicyPage() {
	const params = useParams<{ slug: string }>();
	const { policy } = usePolicy(params?.slug ?? '');

	if (!policy) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader2 className="w-10 h-10 animate-spin" />
			</div>
		);
	}

	return (
		<div className="space-y-2 max-w-[1000px] mx-auto w-full bg-surface rounded-default divide-y divide-border">
			<div className="px-10 py-5">
				<H2>{policy.name}</H2>
				<p>{policy.description}</p>
			</div>
			<div className="px-10 py-5">
				<OrderForm />
			</div>
		</div>
	);
}
