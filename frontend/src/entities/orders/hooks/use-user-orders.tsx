'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../orders.services';
import { OrderFilters } from '../orders.types';

export const useOrders = (filters?: OrderFilters) => {
	const { getToken } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: ['orders', filters],
		queryFn: async () => await getOrders(await getToken(), filters),
	});

	return {
		orders: data?.data,
		isOrdersLoading: isLoading,
	};
};
