'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllCompanies } from '@/entities/companies';

export const useCompanies = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['companies'],
		queryFn: getAllCompanies,
	});

	return {
		companies: data?.data,
		isLoadingCompanies: isLoading,
	};
};
