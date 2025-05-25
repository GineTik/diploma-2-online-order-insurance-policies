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
	FormFieldMultiFieldInput,
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	CompleteFormFieldSelect,
} from '@/shared/ui';
import {
	PolicyCategory,
	CreateCategorySchema,
	createCategorySchema,
	DeleteCategorySchema,
	deleteCategorySchema,
} from '../categories.types';
import { EllipsisVertical, Loader2, SaveIcon, XIcon } from 'lucide-react';
import { PERMISSIONS, UnderPermission } from '@/shared/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCategory } from '../hooks/use-update-category';
import { useDeleteCategory } from '../hooks/use-delete-category';
import { usePolicyCategories } from '../hooks/use-policy-categories';

type RowPolicyCategoryCardProps = {
	category: PolicyCategory;
};

export const RowPolicyCategoryCard = ({
	category,
}: RowPolicyCategoryCardProps) => {
	const [isEditing, setIsEditing] = useState(false);

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

						<DeleteCategoryDropdownItemWithDialog category={category} />
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
			fields: category.fields,
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
					<FormFieldMultiFieldInput
						control={form.control}
						name="fields"
						formLabel="Поля"
						buttonText="Додати поле"
					/>
				</div>
			</CardHeader>
			<CardFooter className="mt-3 gap-2">
				<LoadingButton
					className="grow"
					variant="secondary"
					size="sm"
					onClick={submit}
					isLoading={isUpdating}
				>
					<SaveIcon className="size-4" />
					Зберегти
				</LoadingButton>
				<Button
					type="button"
					className="grow"
					variant="outline"
					size="sm"
					onClick={() => cancelEditing()}
				>
					<XIcon className="size-4" />
					Скасувати
				</Button>
			</CardFooter>
		</Form>
	);
};

const DeleteCategoryDropdownItemWithDialog = ({
	category,
}: {
	category: PolicyCategory;
}) => {
	const { deleteCategory, isDeleting } = useDeleteCategory(category.id);
	const { categories, isCategoriesLoading } = usePolicyCategories();
	const form = useForm<DeleteCategorySchema>({
		defaultValues: {
			moveToCategoryId: '',
		},
		resolver: zodResolver(deleteCategorySchema),
	});
	const submit = form.handleSubmit(async (data) => {
		await deleteCategory({
			moveToCategoryId: data.moveToCategoryId,
		});
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild onSelect={(e) => e.preventDefault()}>
				<DropdownMenuItem variant="destructive">Видалити</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Видалити категорію</AlertDialogTitle>
					<AlertDialogDescription>
						Ви впевнені, що хочете видалити категорію &quot;{category.name}
						&quot;? Це незворотня дія! Виберіть іншу категорію, в яку будуть
						переміщені поліси цієї категорії.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div>
					<Form {...form}>
						{isCategoriesLoading ? (
							<div className="flex items-center justify-center">
								<Loader2 className="size-4 animate-spin" />
							</div>
						) : (
							<CompleteFormFieldSelect
								control={form.control}
								name="moveToCategoryId"
								label="Перемістити поліси в іншу категорію"
								placeholder="Інша категорія"
								values={categories
									?.filter((c) => c.id !== category.id)
									.map((category) => ({
										label: category.name,
										value: category.id,
									}))}
							/>
						)}
					</Form>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel>Скасувати</AlertDialogCancel>
					<AlertDialogAction asChild>
						<LoadingButton
							variant="destructive"
							onClick={submit}
							isLoading={isDeleting || isCategoriesLoading}
						>
							Видалити категорію
						</LoadingButton>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
