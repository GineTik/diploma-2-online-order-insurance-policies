import { CompanyFormSchema } from '@/entities/companies';
import { getAuthHeaders } from '@/shared/auth/utils';
import { api } from '@/shared/http-client/api';
import { AuthToken } from '@/shared/auth/types';

export const createCompany = async (
	data: CompanyFormSchema,
	token: AuthToken,
) => {
	return await api.post('/companies', data, getAuthHeaders(token));
};
