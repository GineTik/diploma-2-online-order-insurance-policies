'use client';

import { PolicyCard, usePolicies } from '@/entities/policies';

type PolicyListByCategoryProps = {
	category: string;
};

export const PolicyListByCategory = ({
	category,
}: PolicyListByCategoryProps) => {
	const { policies } = usePolicies();

	if (policies?.length === 0) {
		return (
			<div className="text-center p-5">Не знайдено полісів для {category}</div>
		);
	}

	return (
		<div className="space-y-2">
			{policies?.map((policy) => (
				<PolicyCard key={policy.id} policy={policy} />
			))}
		</div>
	);
};
