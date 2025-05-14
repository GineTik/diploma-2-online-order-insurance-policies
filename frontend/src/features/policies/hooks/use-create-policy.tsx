import { CreatePolicy } from '@/entities/policies';
import { createPolicy } from '@/entities/policies/policies.services';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/app/layout';

export const useCreatePolicy = () => {
	const { getToken } = useAuth();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['create-policy'],
		mutationFn: async (policy: CreatePolicy) =>
			await createPolicy(policy, await getToken()),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['policies'],
			});
		},
	});

	return {
		createPolicy: mutateAsync,
		isCreatingPolicy: isPending,
	};
};
