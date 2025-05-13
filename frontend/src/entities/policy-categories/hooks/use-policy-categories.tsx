'use client';

import { useQuery } from '@tanstack/react-query';
import { getPolicyCategories } from '../categories.service';

export const usePolicyCategories = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['policy-categories'],
		queryFn: async () => await getPolicyCategories(),
	});

	return {
		categories: data?.data,
		isCategoriesLoading: isLoading,
	};
};
