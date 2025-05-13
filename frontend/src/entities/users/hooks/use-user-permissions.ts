'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserPermissions } from '../users.services';
import { useAuth } from '@clerk/nextjs';

export const useUserPermissions = () => {
	const { userId } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: ['user-permissions'],
		queryFn: async () => await getUserPermissions(userId!),
		enabled: !!userId,
	});

	return {
		permissions: data?.data,
		permissionLoading: isLoading,
	};
};
