'use client';

import {
	PolicyCategoryField,
	usePolicyCategory,
} from '@/entities/policy-categories';
import { useForm } from 'react-hook-form';
import { OrderFormInputs } from './order-form-inputs';
import { OrderAction } from './order-action';
import { useParams } from 'next/navigation';
import { PolicyFormFieldWithNameValue } from '..';

export const OrderForm = ({ categoryId }: { categoryId: string }) => {
	const params = useParams<{ slug: string }>();
	const { category } = usePolicyCategory(categoryId);
	const fields = category?.fields?.map((field, index) => ({
		...field,
		name: index.toString(),
		value: '',
	})) as PolicyFormFieldWithNameValue[];

	if (!fields) {
		return <div>No fields</div>;
	}

	return <OrderFormContent fields={fields} slug={params?.slug} />;
};

const OrderFormContent = ({
	fields,
	slug,
}: {
	fields: (PolicyCategoryField & { name: string; value: string })[];
	slug: string;
}) => {
	const form = useForm<Record<string, string>>({
		defaultValues: Object.fromEntries(
			fields?.map((field) => [field.name, field.value]) ?? [],
		),
	});

	return (
		<OrderFormInputs
			form={form}
			fields={fields}
			actions={
				<OrderAction
					slug={slug}
					handleSubmit={form.handleSubmit}
					fields={fields}
				/>
			}
		/>
	);
};
