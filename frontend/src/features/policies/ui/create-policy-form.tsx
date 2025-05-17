'use client';

import { usePolicyCategories } from '@/entities/policy-categories';
import {
	CompleteFormFieldInput,
	CompleteFormFieldSelect,
	CompleteFormFieldTextarea,
	Form,
	LoadingButton,
	H3,
} from '@/shared/ui';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CreatePolicy, policySchema } from '@/entities/policies';
import { useCreatePolicy } from '../hooks/use-create-policy';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormFieldMultiInput } from '@/shared/ui/multy-input';
import { toast } from 'sonner';

export const CreatePolicyForm = () => {
	const form = useForm<CreatePolicy>({
		defaultValues: {
			name: '',
			description: '',
			price: 0,
			categoryId: '',
			slug: '',
			options: [''],
		},
		resolver: zodResolver(policySchema),
	});

	const { categories, isCategoriesLoading } = usePolicyCategories();
	const { createPolicy, isCreatingPolicy } = useCreatePolicy({
		onSuccess: () => {
			form.reset();
		},
		onError: (error) => {
			toast.error(error.response?.data.message ?? 'Щось пішло не так');
		},
	});

	const submit = (data: CreatePolicy) => {
		createPolicy(data);
	};

	return (
		<Form {...form}>
			<div className="space-y-4">
				<H3>Створити поліс</H3>
				<CompleteFormFieldInput
					control={form.control}
					name="name"
					label="Назва"
					placeholder="Назва полісу"
					type="text"
				/>
				<CompleteFormFieldInput
					control={form.control}
					name="slug"
					label="Slug"
					placeholder="slug-policy"
					type="text"
				/>
				<CompleteFormFieldTextarea
					control={form.control}
					name="description"
					label="Опис"
					placeholder="Опис полісу"
				/>
				<FormFieldMultiInput
					control={form.control}
					name="options"
					label="Опції"
					subLabel="Додайте поля для полісу"
					tooltipText="Поля для полісу"
					buttonText="Додати поле"
					defaultValues={form.getValues('options')}
				/>
				<div className="flex items-start gap-4 *:w-full">
					<CompleteFormFieldInput
						control={form.control}
						name="price"
						label="Ціна"
						placeholder="Ціна полісу"
						type="number"
					/>
					{!isCategoriesLoading && (
						<CompleteFormFieldSelect
							control={form.control}
							name="categoryId"
							label="Категорія"
							placeholder="Виберіть категорію"
							values={categories?.map((category) => ({
								label: category.name,
								value: category.id,
							}))}
						/>
					)}
				</div>
				<LoadingButton
					isLoading={isCreatingPolicy}
					className="w-full"
					onClick={form.handleSubmit(submit)}
				>
					<PlusIcon />
					Створити
				</LoadingButton>
			</div>
		</Form>
	);
};
