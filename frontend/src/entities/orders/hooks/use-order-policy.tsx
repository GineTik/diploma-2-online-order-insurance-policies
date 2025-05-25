'use client';

import { useMutation } from '@tanstack/react-query';
import { orderPolicy } from '../orders.services';
import { useAuth } from '@clerk/nextjs';
import { OrderPolicy } from '../orders.types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useOrderPolicy = () => {
	const { getToken } = useAuth();
	const router = useRouter();

	const { mutateAsync, isPending, error } = useMutation({
		mutationKey: ['order-policy'],
		mutationFn: async (orderData: OrderPolicy) =>
			await orderPolicy(orderData, await getToken()),
		onSuccess: (_, variables) => {
			router.push(ROUTES.SUCCESS_ORDER(variables.policySlug));
		},
		onError: (axiosError: AxiosError<{ message: string[] | string }>) => {
			toast.error(axiosError.response?.data.message ?? 'Щось пішло не так');
		},
	});

	return {
		order: mutateAsync,
		isOrderLoading: isPending,
		rawOrderError: error,
	};
};
