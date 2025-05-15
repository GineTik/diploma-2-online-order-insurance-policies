'use client';

import { usePolicyCategory } from '@/entities/policy-categories';
import { useForm } from 'react-hook-form';
import { OrderFormInputs } from './order-form-inputs';
import { OrderAction } from './order-action';
import { useParams } from 'next/navigation';

export const OrderForm = ({ categoryId }: { categoryId: string }) => {
	const params = useParams<{ slug: string }>();
	const { category } = usePolicyCategory(categoryId);
	const form = useForm<Record<string, string>>({
		defaultValues: Object.fromEntries(
			(category?.fields || []).map((field) => [field.name, '']),
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
