'use client';

import { usePolicy } from '@/entities/policies';
import { usePolicyCategory } from '@/entities/policy-categories';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { OrderFormInputs } from './order-form-inputs';
import { OrderAction } from './order-action';

export const OrderForm = () => {
	const params = useParams<{ slug: string }>();
	const form = useForm<Record<string, string>>({
		defaultValues: {},
	});

	const { policy } = usePolicy(params?.slug ?? '');
	const { category } = usePolicyCategory(policy?.categoryId);

	return (
		<>
			<OrderFormInputs
				form={form}
				fields={category.fields}
				actions={
					<OrderAction slug={params?.slug} handleSubmit={form.handleSubmit} />
				}
			/>
		</>
	);
};
