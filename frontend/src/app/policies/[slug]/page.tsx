'use client';

import { usePolicy } from '@/entities/policies';
import { useParams } from 'next/navigation';
import { H2 } from '@/shared/ui/headings';
import { OrderForm } from '@/features/order';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/card';

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
		<Card className="space-y-2 max-w-[1000px] mx-auto w-full divide-y divide-border">
			<CardContent className="*:px-10 *:py-5">
				<div className="">
					<H2>{policy.name}</H2>
					<p>{policy.description}</p>
				</div>
				<div className="">
					<OrderForm />
				</div>
			</CardContent>
		</Card>
	);
}
