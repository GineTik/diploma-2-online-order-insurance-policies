import { CreateCategorySchema } from './types';

export const mapPolicyCategorySchemaToRequest = (
	category: CreateCategorySchema,
) => {
	return {
		name: category.name,
	};
};
