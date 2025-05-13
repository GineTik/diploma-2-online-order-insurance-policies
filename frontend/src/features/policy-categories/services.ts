import { api } from '@/shared/http-client/api';
import { AuthToken } from '@/shared/auth/types';
import { getAuthHeaders } from '@/shared/auth/utils';
import { CreateCategorySchema } from './types';
import { mapPolicyCategorySchemaToRequest } from './mappers';

export const createPolicyCategory = async (
	category: CreateCategorySchema,
	token: AuthToken,
) => {
	return await api.post(
		'/categories',
		mapPolicyCategorySchemaToRequest(category),
		getAuthHeaders(token),
	);
};
