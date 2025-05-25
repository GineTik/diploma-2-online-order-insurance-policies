import { useMutation } from '@tanstack/react-query';
import { updatePolicyCategory } from '../categories.service';
import { useAuth } from '@clerk/nextjs';
import { PolicyCategory } from '../categories.types';
import { queryClient } from '@/app/providers';

export const useUpdateCategory = () => {
	const { getToken } = useAuth();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['update-category'],
		mutationFn: async (category: PolicyCategory) =>
			await updatePolicyCategory(category, await getToken()),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['policy-categories'],
			});
		},
	});

	return { updateCategory: mutateAsync, isUpdating: isPending };
};
