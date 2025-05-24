'use client';

import { useOrderPolicy } from '@/entities/orders';
import { LoadingButton } from '@/shared/ui';
import { useCallback, useEffect } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { PolicyFormFieldWithNameValue } from '..';

type OrderActionProps = {
	slug: string;
	handleSubmit: UseFormHandleSubmit<Record<string, string>>;
	fields: PolicyFormFieldWithNameValue[];
};

export const OrderAction = ({
	slug,
	handleSubmit,
	fields,
}: OrderActionProps) => {
	const { order, isOrderLoading, parsedOrderErrors } = useOrderPolicy();
	useEffect(() => {
		if (parsedOrderErrors) {
			console.log(parsedOrderErrors);
		}
	}, [parsedOrderErrors]);

	const submit = useCallback(
		(data: Record<string, string>) => {
			order({
				policySlug: slug,
				informations: Object.entries(data).map(([name, value]) => ({
					key: fields.find((field) => field.name === name)?.label ?? '',
					value: value,
				})),
			});
		},
		[order, slug, fields],
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
