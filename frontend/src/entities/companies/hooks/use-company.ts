import { useQuery } from '@tanstack/react-query';
import { getCompany } from '../services';

export const useCompany = (id: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['company', id],
		queryFn: async () => await getCompany(id),
	});

	return {
		company: data?.data,
		isCompanyLoading: isLoading,
		companyError: error,
	};
};
