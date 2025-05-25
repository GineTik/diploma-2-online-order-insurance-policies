import { useMutation } from '@tanstack/react-query';
import { deletePolicyCategory } from '../categories.service';
import { useAuth } from '@clerk/nextjs';
import { queryClient } from '@/app/providers';
import { DeleteCategorySchema } from '../categories.types';

export const useDeleteCategory = (categoryId: string) => {
	const { getToken } = useAuth();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['delete-category', categoryId],
		mutationFn: async (deleteCategory: DeleteCategorySchema) =>
			await deletePolicyCategory(categoryId, deleteCategory, await getToken()),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['policy-categories'],
			});
		},
	});

	return { deleteCategory: mutateAsync, isDeleting: isPending };
};
