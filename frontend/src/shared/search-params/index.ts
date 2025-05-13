import { useRouter, useSearchParams } from 'next/navigation';

export const useCustomSearchParam = (key: string) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentValue = searchParams.get(key) || '';

	const handleValueChange = (value: string) => {
		const params = new URLSearchParams(Array.from(searchParams.entries()));
		if (value !== 'none') {
			params.set(key, value);
		} else {
			params.delete(key);
		}
		router.replace(`?${params.toString()}`);
	};

	return {
		currentValue,
		handleValueChange,
	};
};
