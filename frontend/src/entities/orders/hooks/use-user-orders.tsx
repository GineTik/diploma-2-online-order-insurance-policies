'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '../orders.services';

export const useUserOrders = () => {
	const { getToken } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: ['user-orders'],
		queryFn: async () => await getUserOrders(await getToken()),
	});

	return {
		orders: data?.data,
		isOrdersLoading: isLoading,
	};
};
