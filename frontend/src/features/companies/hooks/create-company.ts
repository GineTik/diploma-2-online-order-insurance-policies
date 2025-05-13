import { Company, CompanyFormSchema } from '@/entities/companies';
import { useMutation } from '@tanstack/react-query';
import { createCompany } from '../services';
import { useAuth } from '@clerk/nextjs';

export const useCreateCompany = () => {
	const { getToken } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: CompanyFormSchema) =>
			await createCompany(data, await getToken()),
	});

	return {
		createCompany: mutate,
		isCreatingLoading: isPending,
	};
};
