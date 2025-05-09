'use client';

import {
	Form,
	CompleteFormFieldInput,
	LoadingButton,
	CompleteFormFieldTextarea,
} from '@/shared/ui';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const CreatePolicyCategoryForm = () => {
	const form = useForm({
		defaultValues: {},
	});

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
				<LoadingButton isLoading={false} type="submit" className="w-full">
					<PlusIcon className="size-4 mr-2" />
					Створити
				</LoadingButton>
			</div>
		</Form>
	);
};
