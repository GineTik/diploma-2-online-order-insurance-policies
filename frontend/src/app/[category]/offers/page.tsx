'use client';

import { PolicyFiltration } from '@/features/policies';
import { PolicyList } from '@/widgets/policy-list';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PolicyFilters } from '@/entities/policies';
import { useCustomSearchParam } from '@/shared/search-params';

export default function Page() {
	const params = useParams<{ category: string }>();
	const search = useCustomSearchParam('search');
	const sort = useCustomSearchParam('sort');
	const [filters, setFilters] = useState<PolicyFilters>({
		categorySlug: params.category,
		sort: sort.currentValue,
		search: search.currentValue,
	});

	useEffect(() => {
		setFilters({
			categorySlug: params.category,
			sort: sort.currentValue,
			search: search.currentValue,
		});
	}, [search.currentValue, sort.currentValue, params.category]);

	return (
		<div className="space-y-2 max-w-[800px] mx-auto w-full">
			<PolicyFiltration />
			<PolicyList
				filters={filters}
				notFoundMessage={`Не знайдено полісів для цієї категорії`}
			/>
		</div>
	);
}
