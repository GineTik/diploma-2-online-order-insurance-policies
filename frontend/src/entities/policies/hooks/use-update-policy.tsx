import { queryClient } from '@/app/providers';
import { UpdatePolicy } from '@/entities/policies';
import { updatePolicy } from '@/entities/policies/policies.services';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';

export const useUpdatePolicy = () => {
	const { getToken } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-policy'],
		mutationFn: async (policy: UpdatePolicy) =>
			await updatePolicy(policy, await getToken()),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['policies'] });
		},
	});

	return {
		updatePolicy: mutate,
		isUpdatingPolicy: isPending,
	};
};
