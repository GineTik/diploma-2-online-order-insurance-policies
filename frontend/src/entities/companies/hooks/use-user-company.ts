'use client';

import { useAuth } from '@clerk/nextjs';
import { getUserCompany } from '../companies.services';
import { useQuery } from '@tanstack/react-query';

export const useUserCompany = () => {
	const { getToken, isSignedIn } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: ['user-company'],
		queryFn: async () => await getUserCompany(await getToken()),
		enabled: !!isSignedIn,
	});

	return {
		company: data?.data,
		isCompanyLoading: isLoading,
	};
};
