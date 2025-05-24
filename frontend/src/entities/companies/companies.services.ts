'use client';

import { AuthToken } from '@/shared/auth/types';
import { getAuthHeaders } from '@/shared/auth/utils';
import { api } from '@/shared/http-client/api';
import { CompanyFormSchema, Company, CompanyFilters } from './companies.types';

export const getUserCompany = async (token: AuthToken) => {
	return await api.get(`users/company`, getAuthHeaders(token));
};

export const getCompany = async (id: string) => {
	return await api.get(`companies/${id}`);
};

export const createCompany = async (
	data: CompanyFormSchema,
	token: AuthToken,
) => {
	return await api.post('/companies', data, getAuthHeaders(token));
};

export const getAllCompanies = async (filters: CompanyFilters) => {
	return await api.get<Company[]>('/companies', {
		params: filters,
	});
};

export const deleteCompany = async (id: string, token: AuthToken) => {
	return await api.delete(`companies/${id}`, getAuthHeaders(token));
};

export const updateCompany = async (
	id: string,
	data: CompanyFormSchema,
	token: AuthToken,
) => {
	return await api.put(`companies/${id}`, data, getAuthHeaders(token));
};
