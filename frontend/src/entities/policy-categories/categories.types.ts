import { z } from 'zod';
import { FieldType, fieldTypes } from '@/shared/types';

export type PolicyCategory = {
	id: string;
	name: string;
	slug: string;
	description: string;
	fields: PolicyCategoryField[];
	policiesCount: number;
};

export type PolicyCategoryField = {
	label: string;
	placeholder?: string;
	type: FieldType;
	values?: { label: string; price: number }[];
	price?: number;
};

export type PolicyCategoryFormField = PolicyCategoryField & {
	value: string;
};

export const createCategorySchema = z.object({
	name: z.string().min(1),
	slug: z.string().min(1),
	description: z.string().min(1),
	fields: z.array(
		z.object({
			label: z.string().min(1),
			type: z.enum(fieldTypes),
			values: z.array(z.string()).optional(),
			placeholder: z.string().optional(),
			price: z.coerce.number().optional(),
		}),
	),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export const deleteCategorySchema = z.object({
	moveToCategoryId: z.string().min(1, {
		message: "Вибір категорії є обов'язковим",
	}),
});

export type DeleteCategorySchema = z.infer<typeof deleteCategorySchema>;
