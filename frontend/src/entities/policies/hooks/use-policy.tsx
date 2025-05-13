import { useQuery } from '@tanstack/react-query';
import { getPolicy } from '../policies.services';

export const usePolicy = (slug: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['policy', slug],
		queryFn: () => getPolicy(slug),
	});

	return {
		policy: data?.data,
		policyIsLoading: isLoading,
		policyError: error,
	};
};
