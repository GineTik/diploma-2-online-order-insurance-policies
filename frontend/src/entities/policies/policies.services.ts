import { api } from '@/shared/http-client/api';
import {
	CreatePolicy,
	Policy,
	PolicyFilters,
	UpdatePolicy,
} from './policies.types';
import { AuthToken } from '@/shared/auth/types';
import { getAuthHeaders } from '@/shared/auth/utils';
import {
	mapFromPolicySchemaToCreateRequest,
	mapFromPolicySchemaToUpdateRequest,
} from './policies.mapper';

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
		mapFromPolicySchemaToCreateRequest(policy),
		getAuthHeaders(token),
	);
};

export const updatePolicy = async (policy: UpdatePolicy, token: AuthToken) => {
	return await api.put(
		`/policies/${policy.oldSlug}`,
		mapFromPolicySchemaToUpdateRequest(policy),
		getAuthHeaders(token),
	);
};

export const deletePolicy = async (slug: string, token: AuthToken) => {
	return await api.delete(`/policies/${slug}`, getAuthHeaders(token));
};
