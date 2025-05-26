import { api } from '@/shared/http-client/api';
import {
	CreateCategorySchema,
	DeleteCategorySchema,
	PolicyCategory,
} from './categories.types';
import { AuthToken } from '@/shared/auth/types';
import { getAuthHeaders } from '@/shared/auth/utils';
import { mapPolicyCategorySchemaToRequest } from './categories.mapper';

export const getPolicyCategories = async () => {
	const categories = await api.get<PolicyCategory[]>('/categories');

	return {
		data: categories?.data,
	};
};

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

export const updatePolicyCategory = async (
	id: string,
	category: CreateCategorySchema,
	token: AuthToken,
) => {
	return await api.put(
		`/categories/${id}`,
		mapPolicyCategorySchemaToRequest(category),
		getAuthHeaders(token),
	);
};

export const deletePolicyCategory = async (
	categoryId: string,
	deleteCategory: DeleteCategorySchema,
	token: AuthToken,
) => {
	return await api.delete(`/categories/${categoryId}`, {
		...getAuthHeaders(token),
		params: {
			moveToCategoryId: deleteCategory.moveToCategoryId,
		},
	});
};
