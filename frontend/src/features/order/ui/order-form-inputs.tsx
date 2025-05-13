import { CompleteFormFieldInput } from '@/shared/ui/input';
import { Control, UseFormReturn } from 'react-hook-form';
import { Form } from '@/shared/ui/form';
import { H3 } from '@/shared/ui/headings';
import { CompleteFormFieldSelect } from '@/shared/ui/select';
import { PolicyCategoryField } from '@/entities/policy-categories';

type OrderFormInputsProps = {
	form: UseFormReturn<any>;
	fields: PolicyCategoryField[];
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
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					{fields.map((field, index) =>
						getFieldComponent(index.toString(), form.control, field),
					)}
				</div>
				{actions}
			</Form>
		</div>
	);
};

const getFieldComponent = (
	key: string,
	control: Control<any, any, any>,
	field: PolicyCategoryField,
) => {
	const dictionary = {
		string: (
			<CompleteFormFieldInput
				key={key}
				control={control}
				{...field}
				type="text"
			/>
		),
		text: <CompleteFormFieldInput key={key} control={control} {...field} />,
		number: <CompleteFormFieldInput key={key} control={control} {...field} />,
		select: <CompleteFormFieldSelect key={key} control={control} {...field} />,
	};

	return dictionary[field.type] ?? null;
};
