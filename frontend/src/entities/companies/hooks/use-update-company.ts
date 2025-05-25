import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { UpdateCompanySchema } from '../companies.types';
import { updateCompany } from '../companies.services';
import { queryClient } from '@/app/providers';

export const useUpdateCompany = (id: string) => {
	const { getToken } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-company', id],
		mutationFn: async (data: UpdateCompanySchema) =>
			await updateCompany(id, data, await getToken()),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['companies'] });
			await queryClient.invalidateQueries({ queryKey: ['company', id] });
		},
	});

	return { updateCompany: mutate, isUpdating: isPending };
};
