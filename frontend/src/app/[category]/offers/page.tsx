'use client';

import { PolicyFiltration } from '@/features/policies';
import { PolicyListByCategory } from '@/widgets/policy-list';
import { useParams } from 'next/navigation';

export default function Page() {
	const params = useParams<{ category: string }>();

	return (
		<div className="space-y-2 max-w-[800px] mx-auto w-full">
			<PolicyFiltration />
			<PolicyListByCategory category={params.category} />
		</div>
	);
}
