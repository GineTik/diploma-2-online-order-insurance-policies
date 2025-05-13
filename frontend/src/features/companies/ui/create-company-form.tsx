'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	Input,
	FormMessage,
	Form,
	LoadingButton,
} from '@/shared/ui';
import { Card, CardContent } from '@/shared/ui';
import { CompanyFormSchema, companyFormSchema } from '@/entities/companies';
import { useCreateCompany } from '../hooks/use-create-company';

export const CreateCompanyForm = () => {
	const form = useForm<CompanyFormSchema>({
		resolver: zodResolver(companyFormSchema),
		defaultValues: {
			name: '',
		},
	});

	const { createCompany, isCreatingLoading } = useCreateCompany();

	return (
		<Form {...form}>
			<Card className="">
				<CardContent className="space-y-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Назва компанії</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<LoadingButton
						variant={'secondary'}
						className="w-full"
						isLoading={isCreatingLoading}
						onClick={form.handleSubmit((data) => createCompany(data))}
					>
						Створити
					</LoadingButton>
				</CardContent>
			</Card>
		</Form>
	);
};
