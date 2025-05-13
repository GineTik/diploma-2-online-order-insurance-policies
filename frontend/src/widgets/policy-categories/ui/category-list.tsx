'use client';

import { H2 } from '@/shared/ui/headings';
import { usePolicyCategories } from '@/entities/policy-categories/hooks/use-policy-categories';

export const PolicyCategoriesList = () => {
	const { categories } = usePolicyCategories();

	return (
		<div className="space-y-4">
			<H2 className="pl-2">Категорії полісів</H2>

			{categories?.length === 0 ? (
				<p className="pl-2 text-sm text-on-surface-variant">
					Категорії відсутні
				</p>
			) : (
				<div className="flex flex-col gap-2">
					{categories?.map((category) => (
						<div key={category.id} className="flex items-center gap-2"></div>
					))}
				</div>
			)}
		</div>
	);
};
