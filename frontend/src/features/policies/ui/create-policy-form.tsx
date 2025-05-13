'use client';

import { usePolicyCategories } from '@/entities/policy-categories/hooks/use-policy-categories';
import {
	CompleteFormFieldInput,
	CompleteFormFieldSelect,
	CompleteFormFieldTextarea,
	Form,
	LoadingButton,
} from '@/shared/ui';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { CreatePolicy } from '../types';

export const CreatePolicyForm = () => {
	const form = useForm<CreatePolicy>({
		defaultValues: {
			name: '',
			description: '',
			price: 0,
			categoryId: '',
		},
	});

	const { categories, isCategoriesLoading } = usePolicyCategories();

	useEffect(() => {
		const subscription = form.watch((value) => {
			console.log('Form values:', value);
		});
		return () => subscription.unsubscribe();
	}, [form]);

	return (
		<Form {...form}>
			<div className="space-y-4">
				<CompleteFormFieldInput
					control={form.control}
					name="name"
					label="Назва"
					placeholder="Назва полісу"
					type="text"
				/>
				<CompleteFormFieldTextarea
					control={form.control}
					name="description"
					label="Опис"
					placeholder="Опис полісу"
				/>
				<div className="flex gap-4 *:w-full">
					<CompleteFormFieldInput
						control={form.control}
						name="price"
						label="Ціна"
						placeholder="Ціна полісу"
						type="text"
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
				<LoadingButton isLoading={false} className="w-full">
					<PlusIcon />
					Створити
				</LoadingButton>
			</div>
		</Form>
	);
};
