import { deletePolicy } from '@/entities/policies/policies.services';
import { queryClient } from '@/app/providers';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';

export const useDeletePolicy = (slug: string) => {
	const { getToken } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationKey: ['delete-policy'],
		mutationFn: async () => await deletePolicy(slug, await getToken()),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['policies'] });
		},
	});

	return {
		deletePolicy: mutate,
		isDeletingPolicy: isPending,
	};
};
