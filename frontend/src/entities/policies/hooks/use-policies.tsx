'use client';

import { useQuery } from '@tanstack/react-query';
import { getPolicies } from '../policies.services';

export const usePolicies = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['policies'],
		queryFn: async () => await getPolicies(),
	});

	return {
		policies: data?.data,
		isPoliciesLoading: isLoading,
		policiesError: error,
	};
};
