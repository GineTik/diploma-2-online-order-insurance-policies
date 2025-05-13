'use client';

import { useForm } from 'react-hook-form';
import { companyFormSchema, CompanyFormSchema } from '../types';
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
import { useCreateCompany } from '@/features/companies';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type CompanyFormProps = {
	actions: React.ReactNode;
};

export const CompanyForm = () => {
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
