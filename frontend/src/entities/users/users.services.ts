import { api } from '@/shared/http-client/api';

export const getUserPermissions = async (userId: string) => {
	return await api.get<string[]>(`/users/${userId}/permissions`);
};
