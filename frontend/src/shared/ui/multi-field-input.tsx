'use client';

import React, { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';
import { TrashIcon, PlusIcon } from 'lucide-react';
import { FormField, FormLabel, FormMessage } from './form';
import { Control, Path, FieldError } from 'react-hook-form';
import { MultiInput } from './multy-input';
import { FieldType } from '@/shared/types';

export interface FieldItem {
	id: string;
	type: FieldType;
	label: string;
	placeholder?: string;
	values?: string[];
}

const createNewField = (): FieldItem => ({
	id: crypto.randomUUID(),
	type: 'string',
	label: '',
	placeholder: '',
	values: [],
});

interface MultiFieldInputProps {
	componentLabel: string;
	buttonText?: string;
	defaultItems?: FieldItem[];
	onChange: (items: FieldItem[]) => void;
	itemErrors?: Array<
		Partial<Record<keyof Omit<FieldItem, 'id'>, FieldError>> | undefined
	>;
}

export const MultiFieldInput = ({
	componentLabel,
	buttonText = 'Додати властивість',
	defaultItems = [createNewField()],
	onChange,
	itemErrors,
}: MultiFieldInputProps) => {
	const [items, setItems] = useState<FieldItem[]>(
		defaultItems?.map((i) => ({
			...i,
			id: crypto.randomUUID(),
		})) ?? [createNewField()],
	);

	const handleAddItem = () => {
		const newItems = [...items, createNewField()];
		setItems(newItems);
		onChange(newItems);
	};

	const handleRemoveItem = (id: string) => {
		const newItems = items.filter((item) => item.id !== id);
		// If removing the last item makes the list empty, add a new blank field
		// if the expectation is to always have at least one field.
		// For now, allows removal to an empty list if not handled by defaultItems logic or initial value.
		setItems(newItems.length > 0 ? newItems : [createNewField()]);
		onChange(newItems.length > 0 ? newItems : [createNewField()]);
	};

	const handleItemChange = (
		id: string,
		updatedProperties: Partial<FieldItem>,
	) => {
		const newItems = items.map((item) => {
			if (item.id === id) {
				const newItem = { ...item, ...updatedProperties };
				if (updatedProperties.type) {
					if (updatedProperties.type === 'select') {
						delete newItem.placeholder;
						newItem.values = newItem.values || [];
					} else {
						delete newItem.values;
						newItem.placeholder = newItem.placeholder || '';
					}
				}
				return newItem;
			}
			return item;
		});
		setItems(newItems);
		onChange(newItems);
	};

	return (
		<div className="space-y-4">
			<FormLabel>{componentLabel}</FormLabel>
			<div className="space-y-4 bg-background p-2 rounded-md divide-y divide-card">
				{items?.map((item, index) => {
					const currentItemError = itemErrors?.[index];
					return (
						<div key={index} className="flex gap-1 pb-3">
							<div className="flex flex-wrap gap-2 items-start">
								<SelectTypeForField
									item={item}
									handleItemChange={handleItemChange}
									error={currentItemError?.type}
								/>

								<NameFormField
									item={item}
									handleItemChange={handleItemChange}
									error={currentItemError?.label}
								/>

								<div className="min-w-[150px] w-full">
									{item.type === 'select' && (
										<OptionsFormField
											item={item}
											handleItemChange={handleItemChange}
											error={currentItemError?.values}
										/>
									)}
									{item.type !== 'select' && item.type !== 'boolean' && (
										<PlaceholderFormField
											item={item}
											handleItemChange={handleItemChange}
											error={currentItemError?.placeholder}
										/>
									)}
								</div>
							</div>
							<div className="mt-5">
								{items.length > 1 && (
									<Button
										variant="destructiveGhost"
										size="icon"
										onClick={() => handleRemoveItem(item.id)}
										className=""
										type="button"
									>
										<TrashIcon className="w-4 h-4" />
									</Button>
								)}
							</div>
						</div>
					);
				})}
				<Button
					onClick={handleAddItem}
					variant="outline"
					size="sm"
					className="w-full"
					type="button"
				>
					<PlusIcon className="w-4 h-4 mr-2" />
					{buttonText}
				</Button>
			</div>
			<FormMessage />
		</div>
	);
};

interface FormFieldMultiFieldInputProps<T extends object> {
	formLabel: string;
	buttonText?: string;
	control: Control<T>;
	name: Path<T>;
}

export const FormFieldMultiFieldInput = <T extends object>({
	formLabel,
	buttonText,
	control,
	name,
}: FormFieldMultiFieldInputProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, formState }) => (
				<div className="space-y-2">
					<MultiFieldInput
						componentLabel={formLabel}
						buttonText={buttonText}
						defaultItems={field.value}
						itemErrors={
							formState.errors[name as keyof typeof formState.errors] as any
						}
						{...field}
					/>
					<FormMessage />
				</div>
			)}
		/>
	);
};

const SelectTypeForField = ({
	item,
	handleItemChange,
	error,
}: {
	item: FieldItem;
	handleItemChange: (id: string, updatedProperties: Partial<FieldItem>) => void;
	error?: FieldError;
}) => {
	return (
		<div className="flex-1 min-w-[120px] grow">
			<FormLabel htmlFor={`type-${item.id}`} className="text-xs font-medium">
				Тип
			</FormLabel>
			<Select
				value={item.type}
				onValueChange={(value: FieldType) =>
					handleItemChange(item.id, { type: value })
				}
			>
				<SelectTrigger id={`type-${item.id}`} className="mt-1 w-full">
					<SelectValue placeholder="Оберіть тип" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="string">Строка</SelectItem>
					<SelectItem value="text">Текст</SelectItem>
					<SelectItem value="number">Число</SelectItem>
					<SelectItem value="select">Вибір</SelectItem>
					<SelectItem value="car-number">Номер авто</SelectItem>
					<SelectItem value="boolean">Логічне (так/ні)</SelectItem>
				</SelectContent>
			</Select>
			{error?.message && (
				<p className="text-sm font-medium text-destructive mt-1">
					{error.message}
				</p>
			)}
		</div>
	);
};

const NameFormField = ({
	item,
	handleItemChange,
	error,
}: {
	item: FieldItem;
	handleItemChange: (id: string, updatedProperties: Partial<FieldItem>) => void;
	error?: FieldError;
}) => {
	return (
		<div className="flex-1 min-w-[150px] grow">
			<FormLabel htmlFor={`label-${item.id}`} className="text-xs font-medium">
				Назва поля
			</FormLabel>
			<Input
				id={`label-${item.id}`}
				value={item.label}
				onChange={(e) => handleItemChange(item.id, { label: e.target.value })}
				placeholder="Введіть назву"
				className="mt-1"
			/>
			{error?.message && (
				<p className="text-sm font-medium text-destructive mt-1">
					{error.message}
				</p>
			)}
		</div>
	);
};

const PlaceholderFormField = ({
	item,
	handleItemChange,
	error,
}: {
	item: FieldItem;
	handleItemChange: (id: string, updatedProperties: Partial<FieldItem>) => void;
	error?: FieldError;
}) => {
	return (
		<>
			<FormLabel
				htmlFor={`placeholder-${item.id}`}
				className="text-xs font-medium"
			>
				Підказка (Placeholder)
			</FormLabel>
			<Input
				id={`placeholder-${item.id}`}
				value={item.placeholder || ''}
				onChange={(e) =>
					handleItemChange(item.id, {
						placeholder: e.target.value,
					})
				}
				placeholder="Введіть підказку"
				className="mt-1"
			/>
			{error?.message && (
				<p className="text-sm font-medium text-destructive mt-1">
					{error.message}
				</p>
			)}
		</>
	);
};

const OptionsFormField = ({
	item,
	handleItemChange,
	error,
}: {
	item: FieldItem;
	handleItemChange: (id: string, updatedProperties: Partial<FieldItem>) => void;
	error?: FieldError;
}) => {
	return (
		<div className="w-full space-y-1">
			<FormLabel htmlFor={`options-${item.id}`} className="text-xs font-medium">
				Опції
			</FormLabel>
			<MultiInput
				buttonText="Додати опцію"
				value={item.values}
				onChange={(e) => {
					handleItemChange(item.id, {
						values: e,
					});
				}}
				error={error?.message}
			/>
		</div>
	);
};
