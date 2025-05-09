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
} from '@/shared/ui';

type CompanyFormProps = {
	actions: React.ReactNode;
};

export const CompanyForm = ({ actions }: CompanyFormProps) => {
	const form = useForm<CompanyFormSchema>({
		resolver: zodResolver(companyFormSchema),
		defaultValues: {
			name: '',
		},
	});

	return (
		<Form {...form}>
			<div className="space-y-2">
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
				{actions}
			</div>
		</Form>
	);
};
