import { z } from 'zod';

export const companyFormSchema = z.object({
	name: z.string().min(1),
});

export type CompanyFormSchema = z.infer<typeof companyFormSchema>;

export const updateCompanySchema = companyFormSchema;

export type UpdateCompanySchema = z.infer<typeof updateCompanySchema>;

export type Company = {
	id: string;
	name: string;
	policiesCount: number;
};

export type CompanyFilters = {
	search?: string;
};
