import { CompleteFormFieldInput, CompleteFormFieldTextarea } from '@/shared/ui';
import { Control, Path, UseFormReturn } from 'react-hook-form';
import { Form } from '@/shared/ui/form';
import { H3 } from '@/shared/ui/headings';
import { CompleteFormFieldSelect } from '@/shared/ui/select';
import { PolicyCategoryField } from '@/entities/policy-categories';
import { cn } from '@/shared/lib/utils';
import { CompleteFormFieldSwich } from '@/shared/ui/switch';

type OrderFormInputsProps = {
	form: UseFormReturn<Record<string, string>>;
	fields: (PolicyCategoryField & { name: string })[];
	actions: React.ReactNode;
};

export const OrderFormInputs = ({
	form,
	fields,
	actions,
}: OrderFormInputsProps) => {
	return (
		<div className="space-y-4 p-5 rounded-md bg-background">
			<H3>Параметри вашого полісу</H3>
			<Form {...form}>
				<div className="flex items-start gap-4 flex-wrap">
					{fields
						.filter((field) => field.type !== 'boolean')
						.map((field) => (
							<div
								key={field.name}
								className={cn('w-full lg:w-1/4 grow', {
									'lg:w-full': field.type === 'text',
								})}
							>
								{getFieldComponent(field.name, form.control, field)}
							</div>
						))}
					{fields
						.filter((field) => field.type === 'boolean')
						.map((field) => (
							<div
								key={field.name}
								className={cn('w-full lg:w-1/4 grow', {
									'lg:w-full': field.type === 'text',
								})}
							>
								{getFieldComponent(field.name, form.control, field)}
							</div>
						))}
				</div>
				{actions}
			</Form>
		</div>
	);
};

const getFieldComponent = <T extends object>(
	name: string,
	control: Control<T>,
	field: PolicyCategoryField,
) => {
	const dictionary = {
		string: (
			<CompleteFormFieldInput
				key={name}
				control={control}
				name={name}
				{...field}
				type="text"
			/>
		),
		text: (
			<CompleteFormFieldTextarea
				className="lg:col-span-3"
				key={name}
				control={control}
				name={name}
				{...field}
			/>
		),
		number: (
			<CompleteFormFieldInput
				key={name}
				control={control}
				name={name}
				{...field}
			/>
		),
		select: (
			<CompleteFormFieldSelect
				key={name}
				control={control}
				name={name}
				{...field}
				values={field.values?.map((value) => ({
					value,
					label: value,
				}))}
			/>
		),
		'car-number': (
			<CompleteFormFieldInput
				key={name}
				control={control}
				name={name}
				{...field}
				type="text"
			/>
		),
		boolean: (
			<CompleteFormFieldSwich
				key={name}
				control={control}
				name={name as Path<T>}
				{...field}
			/>
		),
	};

	return dictionary[field.type] ?? null;
};
