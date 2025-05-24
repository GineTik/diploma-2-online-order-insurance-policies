import { useMutation } from '@tanstack/react-query';
import { deleteCompany } from '../companies.services';
import { useAuth } from '@clerk/nextjs';

export const useDeleteCompany = (id: string) => {
	const { getToken } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationKey: ['delete-company', id],
		mutationFn: async () => await deleteCompany(id, await getToken()),
	});

	return { deleteCompany: mutate, isDeleting: isPending };
};
