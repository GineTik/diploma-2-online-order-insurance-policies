'use client';

import { useMutation } from '@tanstack/react-query';
import { orderPolicy } from '../orders.services';
import { useAuth } from '@clerk/nextjs';
import { OrderPolicy } from '../orders.types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';

export const useOrderPolicy = () => {
	const { getToken } = useAuth();
	const router = useRouter();

	const { mutateAsync, isPending, error } = useMutation({
		mutationKey: ['order-policy'],
		mutationFn: async (order: OrderPolicy) =>
			await orderPolicy(order, await getToken()),
		onSuccess: (_, variables) => {
			router.push(ROUTES.SUCCESS_ORDER(variables.policySlug));
		},
	});

	return {
		order: mutateAsync,
		isOrderLoading: isPending,
		orderError: error,
	};
};
