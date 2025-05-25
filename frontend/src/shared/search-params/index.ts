'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useCustomSearchParam = (key: string) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [currentValue, setCurrentValue] = useState(searchParams.get(key) || '');

	const handleValueChange = (value: string) => {
		const params = new URLSearchParams(Array.from(searchParams.entries()));
		if (value === 'none' || value === '') {
			params.delete(key);
		} else {
			params.set(key, value);
		}
		router.replace(`?${params.toString()}`);
		setCurrentValue(value);
	};

	useEffect(() => {
		setCurrentValue(searchParams.get(key) || '');
	}, [searchParams, key]);

	return {
		currentValue,
		handleValueChange,
	};
};
