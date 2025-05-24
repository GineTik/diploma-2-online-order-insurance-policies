'use client';

import {
	UpdateCompanySchema,
	updateCompanySchema,
	useCompany,
} from '@/entities/companies';
import { useDeleteCompany, useUpdateCompany } from '@/entities/companies';
import { cn } from '@/shared/lib/utils';
import {
	ApproveDialog,
	Button,
	CompleteFormFieldInput,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Form,
	H2,
	LoadingButton,
} from '@/shared/ui';
import { useAuth } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { EllipsisVerticalIcon, Loader2, XIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const CompanyProfile = () => {
	const params = useParams<{ id: string }>();
	const { company, isCompanyLoading } = useCompany(params.id);
	const { userId } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const { deleteCompany, isDeleting } = useDeleteCompany(params.id);

	if (!params?.id) {
		return <div>Company not found</div>;
	}

	if (isCompanyLoading) {
		return <Loader2 className="size-5 mx-auto animate-spin" />;
	}

	if (company == null) {
		return <div>Company not found</div>;
	}

	return (
		<div className={cn('flex justify-between gap-2 items-start')}>
			<div className="grow">
				{isEditing ? (
					<EditCompanyForm
						company={company}
						onCancel={() => setIsEditing(false)}
					/>
				) : (
					<Content company={company} />
				)}
			</div>

			{company.admin?.sub === userId && (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="mt-2">
								<EllipsisVerticalIcon className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onClick={() => setIsEditing(true)}
								disabled={isEditing}
							>
								Редагувати
							</DropdownMenuItem>
							<ApproveDialog
								title="Видалити компанію"
								description="Ви впевнені, що хочете видалити цю компанію?"
								onConfirm={deleteCompany}
								preventDefault
								confirmText="Видалити"
								confirmVariant="destructive"
								confirmIsLoading={isDeleting}
							>
								<DropdownMenuItem variant="destructive">
									Видалити
								</DropdownMenuItem>
							</ApproveDialog>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</div>
	);
};

type Company = {
	id: string;
	name: string;
	description?: string | null;
	admin: { sub: string };
};

interface ContentProps {
	company?: Company;
}

const Content = ({ company }: ContentProps) => {
	if (!company) {
		return <div>Company data is not available.</div>;
	}

	return (
		<div className="pt-2">
			<H2>{company.name}</H2>
		</div>
	);
};

interface EditCompanyFormProps {
	company: Company;
	onCancel: () => void;
}

const EditCompanyForm = ({ company, onCancel }: EditCompanyFormProps) => {
	const form = useForm<UpdateCompanySchema>({
		defaultValues: {
			name: company.name,
		},
		resolver: zodResolver(updateCompanySchema),
	});

	const { updateCompany, isUpdating } = useUpdateCompany(company.id);

	const submit = form.handleSubmit((data: UpdateCompanySchema) => {
		updateCompany(data);
		onCancel();
	});

	return (
		<Form {...form}>
			<form onSubmit={submit} className="space-y-4">
				<H2>Редагувати компанію</H2>
				<CompleteFormFieldInput
					control={form.control}
					name="name"
					label="Назва компанії"
				/>
				<div className="flex space-x-2 *:grow">
					<LoadingButton
						type="submit"
						variant="secondary"
						isLoading={isUpdating}
					>
						Зберегти
					</LoadingButton>
					<Button onClick={onCancel} variant="outline">
						<XIcon className="size-4" />
						Скасувати
					</Button>
				</div>
			</form>
		</Form>
	);
};
