import { z } from 'zod';

export type PolicyCategory = {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	fields: PolicyCategoryField[];
};

export type PolicyCategoryField = {
	name: string;
	label: string;
	placeholder: string;
	type: 'string' | 'text' | 'select' | 'number';
	values?: {
		label: string;
		value: string;
	}[];
};

export const createCategorySchema = z.object({
	name: z.string().min(1),
	slug: z.string().min(1),
	description: z.string().min(1),
	price: z.coerce.number().min(1),
	categoryId: z.string().min(1),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
