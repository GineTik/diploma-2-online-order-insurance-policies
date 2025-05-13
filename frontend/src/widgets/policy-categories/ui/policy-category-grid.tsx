import { AccentPolicyCategoryCard } from '@/entities/policy-categories';
import { GridPolicyCategoryCard } from '@/entities/policy-categories/ui/grid-policy-category-card';
import { CarIcon } from 'lucide-react';

export const PolicyCategoryGrid = () => {
	const category = {
		id: '1',
		name: 'Автоцивілка онлайн з вигодою',
	};

	const barge = 10;

	return (
		<div className="mx-auto max-w-[1200px] w-full">
			<div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
				<AccentPolicyCategoryCard
					category={category}
					badge={`${barge} пропозицій`}
					className="bg-gradient-to-r from-blue-300 to-blue-600 xl:col-span-2"
				/>
				<AccentPolicyCategoryCard
					category={category}
					badge={`${barge} пропозицій`}
					className="bg-gradient-to-r from-red-300 to-rose-400"
				/>
				<AccentPolicyCategoryCard
					category={category}
					badge={`Онлайн поліс`}
					className="bg-gradient-to-r from-green-200 to-emerald-400"
				/>
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
				<GridPolicyCategoryCard
					category={category}
					icon={<CarIcon className="text-blue-500 size-10" />}
				/>
				<GridPolicyCategoryCard
					category={category}
					icon={<CarIcon className="text-red-500 size-10" />}
				/>
				<GridPolicyCategoryCard
					category={category}
					icon={<CarIcon className="text-green-500 size-10" />}
				/>
				<GridPolicyCategoryCard
					category={category}
					icon={<CarIcon className="text-yellow-500 size-10" />}
				/>
			</div>
		</div>
	);
};
