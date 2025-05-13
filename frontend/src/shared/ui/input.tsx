import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { FormControl, FormField, FormLabel, FormMessage } from './form';
import { FormItem } from './form';
import { Control } from 'react-hook-form';
import { PolicyCategoryField } from '@/entities/policy-categories';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border border-border bg-input px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className,
			)}
			{...props}
		/>
	);
}

export const CompleteFormFieldInput = ({
	control,
	name,
	label,
	type,
	placeholder,
}: {
	control: Control<any, any, any>;
} & PolicyCategoryField) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							{...field}
							type={type}
							placeholder={placeholder}
							className="w-full"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export { Input };
