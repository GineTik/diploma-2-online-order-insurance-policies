import { CreateCategorySchema } from './categories.types';

export const mapPolicyCategorySchemaToRequest = (
	category: CreateCategorySchema,
) => {
	return {
		name: category.name,
		slug: category.slug,
		description: category.description,
	};
};
