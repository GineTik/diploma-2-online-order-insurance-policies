'use client';

import { AuthToken } from '@/shared/auth/types';
import { getAuthHeaders } from '@/shared/auth/utils';
import { api } from '@/shared/http-client/api';

export const getUserCompany = async (token: AuthToken) => {
	return await api.get('users/company', getAuthHeaders(token));
};
