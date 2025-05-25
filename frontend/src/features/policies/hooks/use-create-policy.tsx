import { CreatePolicy } from '@/entities/policies';
import { createPolicy } from '@/entities/policies/policies.services';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/app/providers';
import { AxiosError } from 'axios';

type UseCreatePolicyProps = {
	onSuccess?: () => void;
	onError?: (error: AxiosError<{ message: string }>) => void;
};

export const useCreatePolicy = ({
	onSuccess,
	onError,
}: UseCreatePolicyProps) => {
	const { getToken } = useAuth();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['create-policy'],
		mutationFn: async (policy: CreatePolicy) =>
			await createPolicy(policy, await getToken()),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['policies'],
			});
			onSuccess?.();
		},
		onError: (error) => {
			onError?.(error as AxiosError<{ message: string }>);
		},
	});

	return {
		createPolicy: mutateAsync,
		isCreatingPolicy: isPending,
	};
};
