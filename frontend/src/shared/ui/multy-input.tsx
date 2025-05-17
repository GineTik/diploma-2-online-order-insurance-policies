import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { TrashIcon } from 'lucide-react';
import { FormField, FormLabel } from './form';
import { Control, FieldValues, Path } from 'react-hook-form';

interface FormFieldMultiInputProps<T extends object> {
	label: string;
	subLabel: string;
	tooltipText: string;
	buttonText?: string;
	defaultValues?: string[];
	control: Control<T>;
	name: Path<T>;
}

export const FormFieldMultiInput = <T extends object>({
	label,
	subLabel,
	tooltipText,
	buttonText = 'Додати',
	defaultValues = [''],
	control,
	name,
}: FormFieldMultiInputProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<MultiInput
					label={label}
					subLabel={subLabel}
					tooltipText={tooltipText}
					buttonText={buttonText}
					defaultValues={defaultValues}
					{...field}
				/>
			)}
		/>
	);
};

interface MultiInputProps<T extends object> {
	label: string;
	subLabel: string;
	tooltipText: string;
	buttonText: string;
	defaultValues?: string[];
	value?: string[];
	onChange: (values: string[]) => void;
}

export const MultiInput = ({
	label,
	subLabel,
	tooltipText,
	buttonText,
	onChange,
	defaultValues = [''],
	value,
}: MultiInputProps<FieldValues>) => {
	const [items, setItems] = useState<string[]>(defaultValues);
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const prevItemsLengthRef = useRef(items.length);

	useEffect(() => {
		setItems(value || defaultValues);
	}, [value]);

	useEffect(() => {
		// Synchronize inputRefs array length with items length
		inputRefs.current = inputRefs.current.slice(0, items.length);

		if (items.length > prevItemsLengthRef.current) {
			// An item was added, focus the new input
			const lastInputEl = inputRefs.current[items.length - 1];
			if (lastInputEl) {
				lastInputEl.focus();
			}
		}
		prevItemsLengthRef.current = items.length; // Update for the next render
	}, [items]);

	const handleAddItem = () => {
		setItems((prevItems) => [...prevItems, '']);
	};

	const handleChange = (index: number, value: string) => {
		const newItems = [...items];
		newItems[index] = value;
		setItems(newItems);
		onChange(newItems);
	};

	const handleRemoveItem = (index: number) => {
		const newItems = items.filter((_, i) => i !== index);
		setItems(newItems);
		onChange(newItems);
	};

	return (
		<div className="space-y-3">
			<FormLabel>{label}</FormLabel>
			{items?.map((item, index) => (
				<div key={index} className="flex items-center space-x-2">
					<div className="flex-grow">
						<div className="flex items-center">
							<Input
								id={`input-${index}`}
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								value={item}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										handleAddItem();
									} else if (
										e.key === 'Backspace' &&
										item === '' &&
										items.length > 1
									) {
										e.preventDefault();
										const originalIndex = index;
										handleRemoveItem(originalIndex);

										setTimeout(() => {
											const focusTargetIndex =
												originalIndex > 0 ? originalIndex - 1 : 0;
											if (inputRefs.current[focusTargetIndex]) {
												inputRefs.current[focusTargetIndex]?.focus();
											}
										}, 0);
									} else if (e.key === 'ArrowUp') {
										if (index > 0) {
											e.preventDefault();
											inputRefs.current[index - 1]?.focus();
										}
									} else if (e.key === 'ArrowDown') {
										if (index < items.length - 1) {
											e.preventDefault();
											inputRefs.current[index + 1]?.focus();
										}
									}
								}}
								className="flex-grow"
								placeholder="Введіть значення"
							/>
							{items.length > 1 && (
								<Button
									variant="outline"
									size="icon"
									onClick={() => handleRemoveItem(index)}
									className="ml-2"
								>
									<TrashIcon className="w-4 h-4" />
								</Button>
							)}
						</div>
					</div>
				</div>
			))}
			<Button
				onClick={handleAddItem}
				variant="outline"
				size="sm"
				className="self-end whitespace-nowrap w-full"
			>
				{buttonText}
			</Button>
		</div>
	);
};
