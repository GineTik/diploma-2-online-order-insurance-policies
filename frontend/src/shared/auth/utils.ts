import { AuthToken } from './types';

export const getAuthHeaders = (token: AuthToken) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};
