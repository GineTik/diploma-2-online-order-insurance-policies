'use client';

import { PolicyList } from '@/widgets/policy-list';
import { PolicyFiltration } from '@/features/policies';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCustomSearchParam } from '@/shared/search-params';
import { PolicyFilters } from '@/entities/policies';

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
		setFilters((old) => ({
			...old,
			sort: sort.currentValue,
			search: search.currentValue,
		}));
	}, [search.currentValue, sort.currentValue]);

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
