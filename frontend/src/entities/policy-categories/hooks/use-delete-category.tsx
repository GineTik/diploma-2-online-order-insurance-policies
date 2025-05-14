import { useMutation } from '@tanstack/react-query';
import { deletePolicyCategory } from '../categories.service';
import { useAuth } from '@clerk/nextjs';
import { queryClient } from '@/app/layout';

export const useDeleteCategory = () => {
	const { getToken } = useAuth();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['delete-category'],
		mutationFn: async (categoryId: string) =>
			await deletePolicyCategory(categoryId, await getToken()),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['policy-categories'],
			});
		},
	});

	return { deleteCategory: mutateAsync, isDeleting: isPending };
};
