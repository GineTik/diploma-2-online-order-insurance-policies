'use client';

import { usePolicy } from '@/entities/policies';
import { usePolicyCategory } from '@/entities/policy-categories';
import { OrderFormInputs } from '@/features/policies';
import { OrderAction } from '@/features/policies';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const OrderForm = () => {
	const params = useParams<{ slug: string }>();
	const form = useForm<any>({
		defaultValues: {},
	});

	const { policy } = usePolicy(params?.slug ?? '');
	const { category } = usePolicyCategory(policy?.categoryId);

	return (
		<>
			<OrderFormInputs
				form={form}
				fields={category.fields}
				actions={<OrderAction slug={params?.slug ?? ''} />}
			/>
		</>
	);
};
