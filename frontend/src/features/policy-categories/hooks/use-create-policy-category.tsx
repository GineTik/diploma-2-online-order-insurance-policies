import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { queryClient } from '@/app/layout';
import {
	CreateCategorySchema,
	createPolicyCategory,
} from '@/entities/policy-categories';

export const useCreatePolicyCategory = () => {
	const { getToken } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationKey: ['create-policy-category'],
		mutationFn: async (category: CreateCategorySchema) =>
			await createPolicyCategory(category, await getToken()),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['policy-categories'],
			});
		},
	});

	return {
		createCategory: mutate,
		isCreatingCategory: isPending,
	};
};
