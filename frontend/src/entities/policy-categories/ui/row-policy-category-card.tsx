import {
	Card,
	CardTitle,
	CardDescription,
	CardHeader,
	DropdownMenuTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	Button,
	CardFooter,
	CompleteFormFieldInput,
	Form,
	LoadingButton,
} from '@/shared/ui';
import {
	PolicyCategory,
	CreateCategorySchema,
	createCategorySchema,
} from '../categories.types';
import { EllipsisVertical, SaveIcon, XIcon } from 'lucide-react';
import { PERMISSIONS, UnderPermission } from '@/shared/auth';
import { ApproveDialog } from '@/shared/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCategory } from '../hooks/use-update-category';
import { useDeleteCategory } from '../hooks/use-delete-category';

type RowPolicyCategoryCardProps = {
	category: PolicyCategory;
};

export const RowPolicyCategoryCard = ({
	category,
}: RowPolicyCategoryCardProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const { deleteCategory, isDeleting } = useDeleteCategory();

	return (
		<Card className="flex-row items-center justify-between gap-3">
			<div className="grow">
				{isEditing ? (
					<EditingForm
						category={category}
						cancelEditing={() => setIsEditing(false)}
					/>
				) : (
					<Content category={category} />
				)}
			</div>
			<UnderPermission permission={PERMISSIONS.MANAGE_POLICY_CATEGORIES}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<EllipsisVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => setIsEditing((state) => !state)}
							disabled={isEditing}
						>
							Редагувати
						</DropdownMenuItem>

						<ApproveDialog
							title="Видалити категорію"
							description="Ви впевнені, що хочете видалити цю категорію?"
							onConfirm={() => {
								deleteCategory(category.id);
							}}
							confirmVariant="destructive"
							confirmText="Видалити"
							confirmIsLoading={isDeleting}
						>
							<DropdownMenuItem
								variant="destructive"
								onSelect={(e) => e.preventDefault()}
							>
								Видалити
							</DropdownMenuItem>
						</ApproveDialog>
					</DropdownMenuContent>
				</DropdownMenu>
			</UnderPermission>
		</Card>
	);
};

const Content = ({ category }: RowPolicyCategoryCardProps) => {
	return (
		<CardHeader>
			<CardTitle>{category.name}</CardTitle>
			<CardDescription>{category.description ?? 'Немає опису'}</CardDescription>
		</CardHeader>
	);
};

const EditingForm = ({
	category,
	cancelEditing,
}: {
	cancelEditing: () => void;
} & RowPolicyCategoryCardProps) => {
	const form = useForm<CreateCategorySchema>({
		defaultValues: {
			slug: category.slug,
			name: category.name,
			description: category.description,
		},
		resolver: zodResolver(createCategorySchema),
	});

	const { updateCategory, isUpdating } = useUpdateCategory();

	const submit = form.handleSubmit(async (data) => {
		await updateCategory({
			...category,
			...data,
		});
		cancelEditing();
	});

	return (
		<Form {...form}>
			<form onSubmit={submit}>
				<CardHeader>
					<div className="space-y-2">
						<CompleteFormFieldInput
							control={form.control}
							name="name"
							label="Назва"
						/>
						<CompleteFormFieldInput
							control={form.control}
							name="description"
							label="Опис"
						/>
						<CompleteFormFieldInput
							control={form.control}
							name="slug"
							label="Slug"
						/>
					</div>
				</CardHeader>
				<CardFooter className="mt-3 gap-2">
					<LoadingButton
						variant="secondary"
						size="sm"
						onSubmit={submit}
						isLoading={isUpdating}
					>
						<SaveIcon className="size-4" />
						Зберегти
					</LoadingButton>
					<Button variant="outline" size="sm" onSubmit={() => cancelEditing()}>
						<XIcon className="size-4" />
						Скасувати
					</Button>
				</CardFooter>
			</form>
		</Form>
	);
};
