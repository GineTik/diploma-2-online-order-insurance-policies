import { api } from '@/shared/http-client/api';
import { CreateCategorySchema, PolicyCategory } from './categories.types';
import { AuthToken } from '@/shared/auth/types';
import { getAuthHeaders } from '@/shared/auth/utils';
import { mapPolicyCategorySchemaToRequest } from './categories.mapper';

export const getPolicyCategories = async () => {
	const categories = await api.get<PolicyCategory[]>('/categories');

	return {
		data: categories?.data?.map((category) => ({
			...category,
			fields: [
				{
					name: 'car-type',
					label: 'Тип авто',
					placeholder: 'Тип авто',
					type: 'select',
					values: [
						{
							label: 'Легковий',
							value: 'car',
						},
						{
							label: 'Мотоцикл',
							value: 'motorcycle',
						},
						{
							label: 'Транспортні засоби спеціального призначення',
							value: 'special-transport',
						},
					],
				},
				{
					name: 'car-engine-volume',
					label: "Об'єм двигуна",
					placeholder: "Об'єм двигуна",
					type: 'string',
				},
				{
					name: 'car-address',
					label: 'Адреса за тех паспортом',
					placeholder: 'Адреса за тех паспортом',
					type: 'string',
				},
				{
					name: 'car-privileges',
					label: 'Пільги',
					placeholder: 'Пільги',
					type: 'string',
				},
				{
					name: 'car-number',
					label: 'Номер вашого авто',
					placeholder: 'АК 9265 АК',
					type: 'string',
				},
			],
		})) as PolicyCategory[],
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
