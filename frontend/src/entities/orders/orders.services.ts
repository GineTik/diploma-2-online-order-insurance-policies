import { api } from '@/shared/http-client/api';
import { getAuthHeaders } from '@/shared/auth/utils';
import { OrderPolicy, Order } from './orders.types';
import { AuthToken } from '@/shared/auth/types';

export const orderPolicy = async (order: OrderPolicy, token: AuthToken) => {
	return await api.post('/orders', order, getAuthHeaders(token));
};

export const getUserOrders = async (token: AuthToken) => {
	return await api.get<Order[]>('users/orders', getAuthHeaders(token));
};
