'use client';

import { useOrderPolicy } from '@/entities/orders';
import { LoadingButton } from '@/shared/ui';
import { useCallback } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

type OrderActionProps = {
	slug: string;
	handleSubmit: UseFormHandleSubmit<Record<string, string>>;
};

export const OrderAction = ({ slug, handleSubmit }: OrderActionProps) => {
	const { order, isOrderLoading } = useOrderPolicy();

	const submit = useCallback(
		(data: Record<string, string>) => {
			order({
				policySlug: slug,
				information: Object.keys(data).map((key) => ({
					key,
					value: data[key],
				})),
			});
		},
		[order, slug],
	);

	return (
		<LoadingButton
			isLoading={isOrderLoading}
			variant="default"
			className="w-full font-bold"
			onClick={handleSubmit(submit)}
		>
			КУПИТИ ОНЛАЙН
		</LoadingButton>
	);
};
