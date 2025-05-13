'use client';

import { usePolicyCategories } from '@/entities/policy-categories';
import { AccentPolicyCategoryCard } from '@/entities/policy-categories';
import { GridPolicyCategoryCard } from '@/entities/policy-categories/ui/grid-policy-category-card';
import { cn } from '@/shared/lib/utils';
import { CarIcon } from 'lucide-react';

export const PolicyCategoryGrid = () => {
	const barge = 10;
	const { categories } = usePolicyCategories();

	return (
		<div className="mx-auto max-w-[1200px] w-full">
			<div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
				{categories?.slice(0, 3)?.map((category, index) => (
					<AccentPolicyCategoryCard
						key={category.id}
						category={category}
						badge={`${barge} пропозицій`}
						className={cn('bg-gradient-to-r', {
							'from-blue-300 to-blue-600 xl:col-span-2': index == 0,
							'from-red-300 to-rose-400': index == 1,
							'from-green-200 to-emerald-400': index == 2,
						})}
					/>
				))}
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
				{categories?.slice(3)?.map((category) => (
					<GridPolicyCategoryCard
						key={category.id}
						category={category}
						icon={<CarIcon className="text-blue-500 size-10" />}
					/>
				))}
			</div>
		</div>
	);
};
