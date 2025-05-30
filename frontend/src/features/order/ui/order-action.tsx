'use client';

import { useOrderPolicy } from '@/entities/orders';
import { LoadingButton } from '@/shared/ui';
import { useCallback, useEffect, useState } from 'react';
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
	const [additionalPrice, setAdditionalPrice] = useState(0);
	const watchFormData = form.watch();

	const submit = useCallback(
		(data: Record<string, string>) => {
			order({
				policySlug: slug,
				informations: Object.entries(data).map(([name, value]) => ({
					key: fields.find((field) => field.name === name)?.label ?? '',
					value: value,
				})),
				price: policyPrice + additionalPrice,
			});
		},
		[order, slug, fields, policyPrice, additionalPrice],
	);

	useEffect(() => {
		let additionalPrice = 0;
		fields.forEach((field) => {
			const value = watchFormData[field.name];
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
		setAdditionalPrice(additionalPrice);
	}, [watchFormData, fields]);

	return (
		<LoadingButton
			isLoading={isOrderLoading}
			variant="default"
			className="w-full font-bold"
			onClick={form.handleSubmit(submit)}
		>
			КУПИТИ ОНЛАЙН ЗА {policyPrice + additionalPrice} грн
		</LoadingButton>
	);
};
