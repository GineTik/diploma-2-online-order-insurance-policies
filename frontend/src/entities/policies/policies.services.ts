import { api } from '@/shared/http-client/api';
import { CreatePolicy, Policy, PolicyFilters } from './policies.types';
import { AuthToken } from '@/shared/auth/types';
import { getAuthHeaders } from '@/shared/auth/utils';
import { mapFromPolicySchemaToRequest } from './policies.mapper';

export const getPolicies = async (filters: PolicyFilters) => {
	return await api.get<Policy[]>('/policies', {
		params: filters,
	});
};

export const getPolicy = async (slug: string) => {
	return await api.get<Policy>(`/policies/${slug}`);
};

export const createPolicy = async (policy: CreatePolicy, token: AuthToken) => {
	return await api.post(
		'/policies',
		mapFromPolicySchemaToRequest(policy),
		getAuthHeaders(token),
	);
};
