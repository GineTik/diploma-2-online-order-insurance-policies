import { AuthToken } from './types';

export const getAuthHeader = (token: AuthToken) => {
	return {
		Authorization: `Bearer ${token}`,
	};
};
