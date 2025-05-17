import { Policy, policySchema } from '../policies.types';
import { Button } from '@/shared/ui/button';
import {
	HandCoinsIcon,
	CheckIcon,
	EllipsisVertical,
	XIcon,
	SaveIcon,
	ArrowRightIcon,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/shared/ui/card';
import { useUserCompany } from '@/entities/companies';
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
	ApproveDialog,
	Badge,
	CompleteFormFieldSelect,
	Form,
	LoadingButton,
} from '@/shared/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CompleteFormFieldInput, CompleteFormFieldTextarea } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePolicyCategories } from '@/entities/policy-categories';
import { useUpdatePolicy } from '@/entities/policies/hooks/use-update-policy';
import { useDeletePolicy } from '../hooks/use-delete-policy';
import { FormFieldMultiInput } from '@/shared/ui/multy-input';

type PolicyCardProps = {
	policy: Policy;
	haveCategoryBadge?: boolean;
};

export const PolicyCard = ({
	policy,
	haveCategoryBadge = true,
}: PolicyCardProps) => {
	const { company } = useUserCompany();
	const [isEditing, setIsEditing] = useState(false);

	return (
		<Card className="md:flex-row p-5 gap-3">
			<div className="flex-1 space-y-2">
				{isEditing ? (
					<EditingForm
						policy={policy}
						cancelEditing={() => setIsEditing(false)}
					/>
				) : (
					<Content policy={policy} haveCategoryBadge={haveCategoryBadge} />
				)}
			</div>
			<div className="md:self-start flex flex-col gap-3 md:items-end max-md:w-full">
				{!isEditing && (
					<div className="flex gap-2 items-center">
						<p className="text-sm font-bold">Ціна: {policy.price} ₴</p>
						<Button variant="default" asChild className="max-md:grow">
							<Link href={ROUTES.POLICY(policy.slug)}>
								<HandCoinsIcon className="size-4 font-semibold" />
								Купити онлайн
							</Link>
						</Button>
					</div>
				)}
				{company?.id === policy.companyId && (
					<PolicyActions
						setIsEditing={setIsEditing}
						isEditing={isEditing}
						slug={policy.slug}
					/>
				)}
			</div>
		</Card>
	);
};

const PolicyActions = ({
	setIsEditing,
	isEditing,
	slug,
}: {
	setIsEditing: (isEditing: boolean) => void;
	isEditing: boolean;
	slug: string;
}) => {
	const { deletePolicy, isDeletingPolicy } = useDeletePolicy(slug);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="max-md:w-full">
					<EllipsisVertical className="size-4" />
					Налаштування
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => setIsEditing(true)}
					disabled={isEditing}
				>
					Редагувати
				</DropdownMenuItem>
				<ApproveDialog
					title="Видалити поліс"
					description="Ви впевнені, що хочете видалити цей поліс?"
					onConfirm={() => deletePolicy()}
					confirmIsLoading={isDeletingPolicy}
					preventDefault
					confirmText="Видалити"
					confirmVariant="destructive"
				>
					<DropdownMenuItem variant="destructive">Видалити</DropdownMenuItem>
				</ApproveDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const Content = ({ policy, haveCategoryBadge }: PolicyCardProps) => {
	return (
		<>
			<CardHeader className="">
				<CardTitle>{policy.name}</CardTitle>
				<CardDescription>{policy.description}</CardDescription>
			</CardHeader>
			<CardContent className="flex gap-2">
				<div className="">
					<ul className="space-y-1 list-none">
						{policy.options.map((option) => (
							<li key={option} className="flex items-center gap-2 text-sm">
								<CheckIcon className="size-4 text-emerald-500" />
								{option}
							</li>
						))}
					</ul>
				</div>
			</CardContent>
			{haveCategoryBadge && (
				<Badge
					variant="outline"
					className="bg-background hover:opacity-80 duration-100 rounded-full"
					asChild
				>
					<Link href={ROUTES.POLICY_LIST(policy.category.slug)}>
						{policy.category.name}
						<ArrowRightIcon className="size-4" />
					</Link>
				</Badge>
			)}
		</>
	);
};

const EditingForm = ({
	policy,
	cancelEditing,
}: {
	policy: Policy;
	cancelEditing: () => void;
}) => {
	const { categories } = usePolicyCategories();
	const { updatePolicy, isUpdatingPolicy } = useUpdatePolicy();

	const form = useForm({
		defaultValues: {
			name: policy.name,
			description: policy.description,
			slug: policy.slug,
			price: policy.price,
			categoryId: policy.categoryId,
			options: policy.options,
		},
		resolver: zodResolver(policySchema),
	});

	const submit = form.handleSubmit((data) => {
		updatePolicy({
			...data,
			oldSlug: policy.slug,
		});
		cancelEditing();
	});

	return (
		<Form {...form}>
			<form onSubmit={submit}>
				<CardContent className="space-y-2">
					<CompleteFormFieldInput
						control={form.control}
						name="name"
						label="Назва"
					/>
					<CompleteFormFieldInput
						control={form.control}
						name="slug"
						label="Slug"
					/>
					<CompleteFormFieldTextarea
						control={form.control}
						name="description"
						label="Опис"
					/>
					<CompleteFormFieldInput
						control={form.control}
						name="price"
						label="Ціна"
					/>
					<CompleteFormFieldSelect
						control={form.control}
						name="categoryId"
						label="Категорія"
						values={categories?.map((category) => ({
							label: category.name,
							value: category.id,
						}))}
					/>
					<FormFieldMultiInput
						control={form.control}
						name="options"
						label="Опції"
						subLabel="Додайте поля для полісу"
						tooltipText="Поля для полісу"
						defaultValues={policy.options}
					/>
				</CardContent>
				<CardFooter className="mt-3 gap-2">
					<LoadingButton
						variant="secondary"
						size="sm"
						className="grow"
						isLoading={isUpdatingPolicy}
					>
						<SaveIcon className="size-4" />
						Зберегти
					</LoadingButton>
					<Button
						variant="outline"
						size="sm"
						onClick={() => cancelEditing()}
						className="grow"
					>
						<XIcon className="size-4" />
						Скасувати
					</Button>
				</CardFooter>
			</form>
		</Form>
	);
};
