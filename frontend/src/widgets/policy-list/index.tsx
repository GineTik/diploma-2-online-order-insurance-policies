'use client';

import { PolicyCard, PolicyFilters, usePolicies } from '@/entities/policies';
import { Loader2 } from 'lucide-react';

type PolicyListProps = {
	filters?: PolicyFilters;
	notFoundMessage?: React.ReactNode;
};

export const PolicyList = ({ filters, notFoundMessage }: PolicyListProps) => {
	const { policies, isPoliciesLoading } = usePolicies(filters);

	if (policies?.length === 0) {
		return (
			<div className="text-center p-5">{notFoundMessage || 'Не знайдено'}</div>
		);
	}

	if (isPoliciesLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<Loader2 className="w-10 h-10 animate-spin" />
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{policies?.map((policy) => (
				<PolicyCard
					key={policy.id}
					policy={policy}
					haveCategoryBadge={!filters?.categorySlug}
				/>
			))}
		</div>
	);
};
