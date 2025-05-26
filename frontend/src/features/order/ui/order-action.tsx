'use client';

import { useOrderPolicy } from '@/entities/orders';
import { LoadingButton } from '@/shared/ui';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PolicyFormFieldWithNameValue } from '..';
import { FIELD_TYPES } from '@/shared/types';

type OrderActionProps = {
	slug: string;
	form: UseFormReturn<Record<string, string>>;
	fields: PolicyFormFieldWithNameValue[];
	policyPrice: number;
};

export const OrderAction = ({
	slug,
	form,
	fields,
	policyPrice,
}: OrderActionProps) => {
	const { order, isOrderLoading } = useOrderPolicy();

	const submit = useCallback(
		(data: Record<string, string>) => {
			let additionalPrice = 0;
			fields.forEach((field) => {
				const value = data[field.name];
				if (field.type === FIELD_TYPES.SELECT && field.values) {
					const selectedValue = field.values.find((v) => v.label === value);
					if (selectedValue && selectedValue.price) {
						additionalPrice += selectedValue.price;
					}
				} else if (field.type === FIELD_TYPES.NUMBER) {
					const numValue = parseFloat(value) * (field.price ?? 0);
					if (!isNaN(numValue)) {
						additionalPrice += numValue;
					}
				}
			});

			order({
				policySlug: slug,
				informations: Object.entries(data).map(([name, value]) => ({
					key: fields.find((field) => field.name === name)?.label ?? '',
					value: value,
				})),
				price: policyPrice + additionalPrice,
			});
		},
		[order, slug, fields, policyPrice],
	);

	return (
		<LoadingButton
			isLoading={isOrderLoading}
			variant="default"
			className="w-full font-bold"
			onClick={form.handleSubmit(submit)}
		>
			КУПИТИ ОНЛАЙН
		</LoadingButton>
	);
};
