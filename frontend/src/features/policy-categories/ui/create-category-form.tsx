'use client';

import {
	Form,
	CompleteFormFieldInput,
	LoadingButton,
	CompleteFormFieldTextarea,
	Card,
	CardContent,
	H3,
	FormFieldMultiFieldInput,
	createNewField,
} from '@/shared/ui';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreatePolicyCategory } from '../hooks/use-create-policy-category';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	CreateCategorySchema,
	createCategorySchema,
} from '@/entities/policy-categories';

export const CreatePolicyCategoryForm = () => {
	const form = useForm<CreateCategorySchema>({
		defaultValues: {
			name: '',
			slug: '',
			description: '',
			fields: [createNewField()],
		},
		resolver: zodResolver(createCategorySchema),
	});

	const { createCategory, isCreatingCategory } = useCreatePolicyCategory();

	const submit = form.handleSubmit((data) => {
		createCategory(data);
		form.reset();
	});

	return (
		<Form {...form}>
			<Card>
				<CardContent className="space-y-4 w-[300px]">
					<H3>Створити категорію</H3>
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
					<FormFieldMultiFieldInput
						formLabel="Поля категорії"
						control={form.control}
						name="fields"
					/>
					<LoadingButton
						isLoading={isCreatingCategory}
						className="w-full"
						onClick={submit}
					>
						<PlusIcon className="size-4 mr-2" />
						Створити
					</LoadingButton>
				</CardContent>
			</Card>
		</Form>
	);
};
