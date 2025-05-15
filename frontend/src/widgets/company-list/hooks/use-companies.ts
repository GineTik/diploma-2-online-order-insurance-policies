'use client';

import { useQuery } from '@tanstack/react-query';
import { CompanyFilters, getAllCompanies } from '@/entities/companies';

type UseCompaniesProps = {
	filters: CompanyFilters;
};

export const useCompanies = ({ filters }: UseCompaniesProps) => {
	const { data, isLoading } = useQuery({
		queryKey: ['companies', filters],
		queryFn: async () => await getAllCompanies(filters),
	});

	return {
		companies: data?.data,
		isLoadingCompanies: isLoading,
	};
};
