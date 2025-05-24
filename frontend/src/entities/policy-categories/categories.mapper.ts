import { CreateCategorySchema } from './categories.types';

export const mapPolicyCategorySchemaToRequest = (
	category: CreateCategorySchema,
) => {
	return {
		name: category.name,
		slug: category.slug,
		description: category.description,
		fields: category.fields.map((field) => ({
			label: field.label,
			placeholder: field.placeholder,
			type: field.type,
			values: field.values,
		})),
	};
};
