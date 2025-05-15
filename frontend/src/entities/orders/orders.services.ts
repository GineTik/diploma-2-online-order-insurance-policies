import { api } from '@/shared/http-client/api';
import { getAuthHeaders } from '@/shared/auth/utils';
import { OrderPolicy, Order, OrderFilters } from './orders.types';
import { AuthToken } from '@/shared/auth/types';

export const orderPolicy = async (order: OrderPolicy, token: AuthToken) => {
	return await api.post('/orders', order, getAuthHeaders(token));
};

export const getOrders = async (token: AuthToken, filters?: OrderFilters) => {
	return await api.get<Order[]>('orders', {
		...getAuthHeaders(token),
		params: filters,
	});
};

export const updateStatusOrder = async (
	token: AuthToken,
	orderId: string,
	status: 'approve' | 'cancel',
) => {
	return await api.patch(
		`orders/${orderId}/${status}`,
		{},
		getAuthHeaders(token),
	);
};
