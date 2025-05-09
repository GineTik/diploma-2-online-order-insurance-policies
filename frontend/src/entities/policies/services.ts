import { api } from '@/shared/http-client/api';
import { Policy } from './types';

export const getPolicies = async () => {
	//return await api.get<Policy[]>('/policies');

	return Promise.resolve({
		data: [
			{
				id: '1',
				slug: 'policy-1',
				name: 'Policy 1',
				description: 'Description 1',
				price: 100,
				options: ['Option 1', 'Option 2', 'Option 3'],
			},
			{
				id: '2',
				slug: 'policy-2',
				name: 'Policy 2',
				description: 'Description 2',
				price: 200,
				options: ['Option 1', 'Option 2', 'Option 3'],
			},
		] as Policy[],
	});
};

export const getPolicy = async (slug: string) => {
	//return await api.get<Policy>(`/policies/${slug}`);

	return Promise.resolve({
		data: {
			id: '1',
			slug: 'policy-1',
			name: 'Policy 1',
			description: 'Description 1',
			price: 100,
			options: ['Option 1', 'Option 2', 'Option 3'],
		} as Policy,
	});
};
