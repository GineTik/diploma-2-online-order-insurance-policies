import { z } from 'zod';

export const companyFormSchema = z.object({
	name: z.string().min(1),
});

export type CompanyFormSchema = z.infer<typeof companyFormSchema>;

export type Company = {
	id: string;
	name: string;
	policiesCount: number;
};
