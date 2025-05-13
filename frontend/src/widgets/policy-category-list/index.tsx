'use client';

import { usePolicyCategories } from '@/entities/policy-categories';
import { RowPolicyCategoryCard } from '@/entities/policy-categories/ui/row-policy-category-card';

export const PolicyCategoryList = () => {
	const { categories } = usePolicyCategories();

	return (
		<div className="space-y-2">
			{categories?.map((category, index) => (
				<RowPolicyCategoryCard key={index} category={category} />
			))}
		</div>
	);
};
