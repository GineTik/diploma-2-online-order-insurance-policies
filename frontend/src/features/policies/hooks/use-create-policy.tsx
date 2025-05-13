import { CreatePolicy } from '@/entities/policies';
import { createPolicy } from '@/entities/policies/policies.services';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';

export const useCreatePolicy = () => {
	const { getToken } = useAuth();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (policy: CreatePolicy) =>
			await createPolicy(policy, await getToken()),
	});

	return {
		createPolicy: mutateAsync,
		isCreatingPolicy: isPending,
	};
};
