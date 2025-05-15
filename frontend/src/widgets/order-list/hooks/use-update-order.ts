'use client';

import { queryClient } from '@/app/layout';
import { updateStatusOrder } from '@/entities/orders/orders.services';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';

export const useUpdateOrder = () => {
	const { getToken } = useAuth();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['update-order'],
		mutationFn: async ({
			orderId,
			status,
		}: {
			orderId: string;
			status: 'approve' | 'cancel';
		}) => await updateStatusOrder(await getToken(), orderId, status),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
	});

	return { updateOrder: mutateAsync, isUpdating: isPending };
};
