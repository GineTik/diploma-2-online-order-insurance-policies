'use client';

import {
	Form,
	CompleteFormFieldInput,
	LoadingButton,
	CompleteFormFieldTextarea,
} from '@/shared/ui';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreatePolicyCategory } from '../hooks/use-create-policy-category';
import { CreateCategorySchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategorySchema } from '../types';

export const CreatePolicyCategoryForm = () => {
	const form = useForm<CreateCategorySchema>({
		defaultValues: {
			name: '',
			slug: '',
			description: '',
		},
		resolver: zodResolver(createCategorySchema),
	});

	const { createCategory, isCreatingCategory } = useCreatePolicyCategory();

	return (
		<Form {...form}>
			<div className="space-y-4 bg-surface rounded-default p-4 w-[300px]">
				<CompleteFormFieldInput
					control={form.control}
					name="name"
					label="Назва категорії"
					placeholder="Введіть назву категорії"
					type="text"
				/>
				<CompleteFormFieldInput
					control={form.control}
					name="slug"
					label="Slug"
					placeholder="Введіть slug категорії"
					type="text"
				/>
				<CompleteFormFieldTextarea
					control={form.control}
					name="description"
					label="Опис категорії"
					placeholder="Введіть опис категорії"
				/>
				<LoadingButton
					isLoading={isCreatingCategory}
					className="w-full"
					onClick={form.handleSubmit((data) => createCategory(data))}
				>
					<PlusIcon className="size-4 mr-2" />
					Створити
				</LoadingButton>
			</div>
		</Form>
	);
};
