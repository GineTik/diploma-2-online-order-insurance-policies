'use client';

import { PolicyListItem } from '@/entities/policies';
import { usePolicies } from '@/entities/policies/hooks/use-policies';

type PolicyListProps = {
	category: string;
};

export const PolicyList = ({ category }: PolicyListProps) => {
	const { policies } = usePolicies();

	if (policies?.length === 0) {
		return (
			<div className="text-center p-5">Не знайдено полісів для {category}</div>
		);
	}

	return (
		<div className="space-y-2">
			{policies?.map((policy) => (
				<PolicyListItem key={policy.id} policy={policy} />
			))}
		</div>
	);
};
