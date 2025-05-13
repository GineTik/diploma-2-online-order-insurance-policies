import { useMutation } from '@tanstack/react-query';
import { createPolicyCategory } from '../services';
import { CreateCategorySchema } from '../types';
import { useAuth } from '@clerk/nextjs';
import { queryClient } from '@/app/layout';

export const useCreatePolicyCategory = () => {
	const { getToken } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationKey: ['create-policy-category'],
		mutationFn: async (category: CreateCategorySchema) =>
			await createPolicyCategory(category, await getToken()),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['policy-categories'],
			});
		},
	});

	return {
		createCategory: mutate,
		isCreatingCategory: isPending,
	};
};
