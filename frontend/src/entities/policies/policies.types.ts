import { z } from 'zod';

export type Policy = {
	id: string;
	name: string;
	description: string;
	price: number;
	options: string[];
	slug: string;
	version: number;
	createdAt: Date;
	updatedAt: Date;
	categoryId: string;
};

export type CreatePolicy = {
	name: string;
	slug: string;
	description: string;
	price: number;
	categoryId: string;
};

export type PolicyFilters = {
	companyId?: string;
	categorySlug?: string;
	sort?: string;
	search?: string;
};

export const policySchema = z.object({
	name: z.string().min(1),
	slug: z
		.string()
		.regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, {
			message:
				'Slug може містити лише латинські літери, цифри та дефіси. Приклад: simple-slug-1',
		})
		.min(1),
	description: z.string().min(1),
});

export type PolicyForm = z.infer<typeof policySchema>;
