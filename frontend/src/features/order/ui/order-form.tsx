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
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldType } from '@/shared/types';

export const OrderForm = ({
	categoryId,
	policyPrice,
}: {
	categoryId: string;
	policyPrice: number;
}) => {
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

	return (
		<OrderFormContent
			fields={fields}
			slug={params?.slug}
			policyPrice={policyPrice}
		/>
	);
};

const OrderFormContent = ({
	fields,
	slug,
	policyPrice,
}: {
	fields: (PolicyCategoryField & { name: string; value: string })[];
	slug: string;
	policyPrice: number;
}) => {
	const schemaDictionary: Record<FieldType, ZodType> = {
		string: z.string().min(1, { message: 'Це поле не може бути пустим' }),
		text: z.string().min(1, { message: 'Це поле не може бути пустим' }),
		number: z.coerce.number().min(1, {
			message: "Число не може бути від'ємним",
		}),
		select: z.string().min(1, { message: 'Оберіть один з варіантів' }),
		'car-number': z.string().regex(/^[A-Z]{2}\d{4}[A-Z]{2}$/, {
			message: 'Не вірний формат номера авто',
		}),
		boolean: z.boolean({
			message: 'Це поле не може бути пустим',
		}),
	};

	const form = useForm<Record<string, string>>({
		defaultValues: Object.fromEntries(
			fields?.map((field) => [field.name, field.value]) ?? [],
		),
		resolver: zodResolver(
			z.object(
				Object.fromEntries(
					fields?.map((field) => [field.name, schemaDictionary[field.type]]) ??
						[],
				),
			),
		),
	});

	return (
		<OrderFormInputs
			form={form}
			fields={fields}
			actions={
				<OrderAction
					slug={slug}
					fields={fields}
					form={form}
					policyPrice={policyPrice}
				/>
			}
		/>
	);
};
