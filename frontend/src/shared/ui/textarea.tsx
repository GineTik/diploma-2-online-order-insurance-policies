import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { Control, Path } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FieldItem,
} from './form';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				'bg-input border-border placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				className,
			)}
			{...props}
		/>
	);
}

export const CompleteFormFieldTextarea = <T extends object>({
	control,
	name,
	label,
	placeholder,
	className,
}: {
	control: Control<T>;
	className?: string;
} & Omit<FieldItem<T>, 'type'>) => {
	return (
		<FormField
			control={control}
			name={name as Path<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea
							{...field}
							placeholder={placeholder}
							className={cn('w-full', className)}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export { Textarea };
