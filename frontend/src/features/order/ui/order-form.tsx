'use client';

import { usePolicyCategory } from '@/entities/policy-categories';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { OrderFormInputs } from './order-form-inputs';
import { OrderAction } from './order-action';

export const OrderForm = () => {
	const params = useParams<{ slug: string }>();
	const { category } = usePolicyCategory();
	const form = useForm<Record<string, string>>({
		defaultValues: Object.fromEntries(
			(category.fields || []).map((field) => [field.name, '']),
		),
	});

	return (
		<OrderFormInputs
			form={form}
			fields={category.fields}
			actions={
				<OrderAction slug={params?.slug} handleSubmit={form.handleSubmit} />
			}
		/>
	);
};
