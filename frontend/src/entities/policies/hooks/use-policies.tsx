'use client';

import { useQuery } from '@tanstack/react-query';
import { getPolicies } from '../policies.services';
import { PolicyFilters } from '../policies.types';

export const usePolicies = (filters?: PolicyFilters) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['policies', filters],
		queryFn: async () =>
			await getPolicies(mapEmptyFiltersToUndefined(filters ?? {})),
	});

	return {
		policies: data?.data,
		isPoliciesLoading: isLoading,
		policiesError: error,
	};
};

const mapEmptyFiltersToUndefined = (filters: PolicyFilters) => {
	return Object.fromEntries(
		Object.entries(filters).map(([key, value]) => [
			key,
			value === '' ? undefined : value,
		]),
	) as PolicyFilters;
};
